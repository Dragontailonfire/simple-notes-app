import { Hono } from "hono";
import "dotenv/config";
import { serve } from "@hono/node-server";
import type { Note } from "@template/shared-types";

// *** DATABASE SETUP (Example using postgres library) ***
const db = {
  query: (sql: string, params: any[] = []) => {
    console.log("Executing SQL:", sql, "with params:", params);
    // In a real app, this connects to the DB_HOST using process.env.DB_USER, etc.
    // Implement actual database querying logic here
    return Promise.resolve({
      rows: [
        {
          id: "1",
          user_id: "001",
          content: "Sample note",
        } as Note,
        {
          id: "2",
          user_id: "001",
          content: "Another Sample note",
        } as Note,
      ],
    });
  },
};

const app = new Hono().basePath("/api");

app.get("/notes", async (c) => {
  //1. AUTH CHECK: Middleware needed here for real auth
  //2. DB QUERY: Call database client here

  const result = await db.query("SELECT * FROM notes WHERE user_id = $1", [
    "current_user_id",
  ]);
  return c.json(result.rows);
});

const port = parseInt(process.env.PORT || "4000");
console.log(`Server running on http://localhost:${port}`);

serve({ fetch: app.fetch, port });

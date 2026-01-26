import { Hono } from "hono";
import "dotenv/config";
import { serve } from "@hono/node-server";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import notes from "./notes";
import folders from "./folders";
import { authMiddleware, Variables } from "./middleware/auth";

const app = new Hono<{ Variables: Variables }>().basePath("/api");
app.use(logger());
app.use("*", secureHeaders());
app.use("*", cors());
app.use(authMiddleware);
app.onError((err, c) => {
    console.error(`${err}`);
    return c.text(
        "Unexpected error. Please retry the operation or contact helpdesk.",
        500,
    );
});
app.route("/notes", notes);
app.route("/folders", folders);

if (process.env.CI === "dev" && process.env.NODE_ENV !== "test") {
    const port = parseInt(process.env.PORT || "4000");
    console.log(`Server running on http://localhost:${port}`);
    serve({ fetch: app.fetch, port });
}

export default app;

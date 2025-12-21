import { describe, expect, it, vi } from "vitest";
import app from ".";

vi.mock("../lib/supabase", () => ({
    getSupabase: () => ({
        auth: {
            getUser: () => Promise.resolve({
                data: { user: { id: "test-user" } },
                error: null
            })
        },
        from: () => ({
            insert: (payload: any) => ({
                select: () => Promise.resolve({
                    data: [{
                        content: payload.content,
                        created_at: new Date().toISOString(),
                        id: 1,
                        updated_at: new Date().toISOString(),
                        user_id: "test-user"
                    }],
                    error: null
                })
            }),
            select: () => ({
                order: () => Promise.resolve({
                    data: [{ id: 1, content: "Test note 1" }],
                    error: null
                })
            })
        })
    })
}));

describe("Server API", () => {
    it("GET /api/notes returns list of notes", async () => {
        const res = await app.request("/api/notes");
        expect(res.status).toBe(200);
    });

    it("POST /api/notes saves a note", async () => {
        const payload = { content: "Save this note" };
        const req = new Request("http://localhost/api/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer token`,
            },
            body: JSON.stringify(payload)
        })
        const res = await app.request(req);
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data[0].content).toBe("Save this note");
    })
});
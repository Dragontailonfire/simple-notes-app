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
                        title: payload.title,
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
                    data: [{ id: 1, title: "Test note 1", content: "Save this note" }],
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
        const data = await res.json();
        expect(data[0].content).toBe("Save this note");
        expect(data[0].title).toBe("Test note 1");
    });

    it("POST /api/notes saves a note", async () => {
        const payload = { content: "Save this note", title: "Test Note 1" };
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
        expect(data[0].title).toBe("Test Note 1");
    })
});
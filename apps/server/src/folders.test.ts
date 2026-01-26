import { describe, expect, it, vi } from "vitest";
import app from ".";

vi.mock("../lib/supabase", () => ({
    getSupabase: () => ({
        auth: {
            getUser: () =>
                Promise.resolve({
                    data: { user: { id: "test-user" } },
                    error: null,
                }),
        },
    }),
}));

vi.mock("./db/connect", () => ({
    db: {
        select: () => ({
            from: () => ({
                where: () => ({
                    orderBy: () =>
                        Promise.resolve([
                            {
                                id: 1,
                                name: "Root folder 1",
                                parentId: null,
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString(),
                                userId: "test-user",
                            },
                        ]),
                }),
            }),
        }),
        insert: () => ({
            values: (payload: any) => ({
                returning: () =>
                    Promise.resolve([
                        {
                            id: 2,
                            name: payload.name,
                            parentId: payload.parentId,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                            userId: "test-user",
                        },
                    ]),
            }),
        }),
        update: () => ({
            set: (payload: any) => ({
                where: () => ({
                    returning: () =>
                        Promise.resolve([
                            {
                                id: 1,
                                name: payload.name,
                                parentId: payload.parentId,
                                createdAt: new Date().toISOString(),
                                updatedAt: new Date().toISOString(),
                                userId: "test-user",
                            },
                        ]),
                }),
            }),
        }),
        delete: () => ({
            where: () => ({
                returning: () =>
                    Promise.resolve([
                        {
                            id: 1,
                            name: "Root folder 1",
                            parentId: null,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString(),
                            userId: "test-user",
                        },
                    ]),
            }),
        }),
    },
}));

describe("Server API", () => {
    it("GET /api/folders returns list of folders", async () => {
        const res = await app.request("/api/folders");
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data[0].parentId).toBe(null);
        expect(data[0].name).toBe("Root folder 1");
    });

    it("POST /api/folders saves a folder", async () => {
        const payload = { parentId: 1, name: "Child folder 1" };
        const req = new Request("http://localhost/api/folders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer token`,
            },
            body: JSON.stringify(payload),
        });
        const res = await app.request(req);
        expect(res.status).toBe(200);
        const data = await res.json();
        expect(data[0].parentId).toBe(1);
        expect(data[0].name).toBe("Child folder 1");
    });
});

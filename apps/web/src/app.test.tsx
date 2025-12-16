import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/preact";
import { App } from "./app";
import { supabase } from "../lib/supabase";

vi.mock("../lib/supabase");
globalThis.fetch = vi.fn();

describe("App component", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render login page", () => {
        render(<App />);
        expect(screen.getByText("Simple Notes App")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Sign in with GitHub/i })).toBeInTheDocument();
    });

    it("should fetch notes when logged in", async () => {
        vi.mocked(supabase.auth.getSession).mockResolvedValue({
            data: {
                session: {
                    access_token: "test-token",
                    user: { id: "test-user-1", email: "test@example.com" }
                }
            },
            error: null
        } as any);

        vi.mocked(fetch).mockResolvedValue({
            ok: true,
            json: async () => [
                { id: 1, content: "Test Note", user_id: "test-user-1", created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
            ]
        } as Response);
        render(<App />);

        await waitFor(() => {
            expect(screen.getByText("Test Note")).toBeInTheDocument();
        });
    });
});
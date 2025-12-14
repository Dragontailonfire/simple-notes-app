import { render, screen } from "@testing-library/preact";
import { describe, expect, vi, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { Login } from "./Login";

describe("Login component", () => {

    it("renders login page", () => {
        render(<Login onLogin={() => { }} />);
        expect(screen.getByText("Login to Simple Notes App")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Sign in with GitHub/i })).toBeInTheDocument();
    })

    it("calls onLogin when clicked", async () => {
        const handleLogin = vi.fn();
        const user = userEvent.setup();
        render(<Login onLogin={handleLogin} />);
        const button = screen.getByRole("button", { name: /Sign in with GitHub/i });
        expect(button).toBeInTheDocument();
        await user.click(button);
        expect(handleLogin).toHaveBeenCalledOnce();
    });
})
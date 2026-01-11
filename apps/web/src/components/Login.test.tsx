import { render, screen } from "@testing-library/preact";
import { describe, expect, it } from "vitest";
import { Login } from "./Login";

describe("Login component", () => {

    it("renders login page", () => {
        render(<Login />);
        expect(screen.getByText("Simple Notes App")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Sign in with GitHub/i })).toBeInTheDocument();
    })
})
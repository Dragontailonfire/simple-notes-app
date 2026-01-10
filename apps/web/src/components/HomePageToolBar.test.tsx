import { render, screen } from "@testing-library/preact";
import { describe, expect, it } from "vitest";
import { HomePageToolBar } from "./HomePageToolBar";

describe("Login component", () => {
    it("renders Home page tool bar", () => {
        render(<HomePageToolBar />);
        expect(screen.getByRole("group", { name: /Sorting button group/i })).toBeInTheDocument();
        expect(screen.getByRole("group", { name: /Layout button group/i })).toBeInTheDocument();
    })
})
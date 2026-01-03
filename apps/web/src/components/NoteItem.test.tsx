import { render, screen } from "@testing-library/preact";
import { describe, expect, it, vi } from "vitest";
import { NoteItem } from "./NoteItem";

vi.mock("wouter", () => ({
    Link: (props: any) => <a {...props}>{props.children}</a>,
}));

describe("Note item component", () => {
    const mockNote = {
        id: 1, content: "Test Note", title: "Note Content", user_id: "user-1", created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    };

    it("renders note", () => {
        render(<NoteItem note={mockNote} />)
        expect(screen.getByText("Test Note")).toBeInTheDocument();
    })
})
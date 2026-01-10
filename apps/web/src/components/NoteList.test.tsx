import { render, screen } from "@testing-library/preact";
import { describe, expect, it, vi } from "vitest";
import { NoteList } from "./NoteList";

vi.mock("wouter", () => ({
    Link: (props: any) => <a {...props}>{props.children}</a>,
}));

describe("Note list component", () => {
    const mockNotes = [{
        id: 1, content: "Test Note", title: "Test Content", userId: "user-1", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
    }];

    it("renders notes", () => {
        render(<NoteList notes={mockNotes} />)
        expect(screen.getByText("Test Note")).toBeInTheDocument();
    })
})
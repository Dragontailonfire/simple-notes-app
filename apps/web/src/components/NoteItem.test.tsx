import { render, screen } from "@testing-library/preact";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { NoteItem } from "./NoteItem";

describe("Note item component", () => {
    const mockNote = {
        id: 1, content: "Test Note", title: "Note Content", user_id: "user-1", created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    };

    it("renders note", () => {
        render(<NoteItem note={mockNote} onDelete={() => { }} onEdit={() => { }} disableEdit={false} />)
        expect(screen.getByText("Test Note")).toBeInTheDocument();
    })

    it("calls onDelete when delete button is clicked", async () => {
        const handleDelete = vi.fn();
        const user = userEvent.setup();
        render(<NoteItem note={mockNote} onDelete={handleDelete} onEdit={() => { }} disableEdit={false} />);
        const deleteButton = screen.getByRole("button", { name: "Delete note" });
        await user.click(deleteButton);
        expect(handleDelete).toHaveBeenCalled();
    });

    it("calls onEdit when edit button is clicked", async () => {
        const handleEdit = vi.fn();
        const user = userEvent.setup();
        render(<NoteItem note={mockNote} onDelete={() => { }} onEdit={handleEdit} disableEdit={false} />);
        const editButton = screen.getByRole("button", { name: "Edit note" });
        await user.click(editButton);
        expect(handleEdit).toHaveBeenCalled();
    });
})
import { render, screen } from "@testing-library/preact";
import { describe, expect, it, vi } from "vitest";
import { NoteList } from "./NoteList";
import userEvent from "@testing-library/user-event";

describe("Note list component", () => {
    const mockNotes = [{
        id: 1, content: "Test Note", user_id: "user-1", created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    }];

    it("renders notes", () => {
        render(<NoteList notes={mockNotes} onDelete={() => { }} onEdit={() => { }} onSaveEditedNote={() => { }} onCancelEditNote={() => { }} editedNoteId={0} disableEdit={false} />)
        expect(screen.getByText("Test Note")).toBeInTheDocument();
    })

    it("calls onDelete when delete button is clicked", async () => {
        const handleDelete = vi.fn();
        const user = userEvent.setup();
        render(<NoteList notes={mockNotes} onDelete={handleDelete} onEdit={() => {}} onSaveEditedNote={() => { }} onCancelEditNote={() => { }} editedNoteId={0} disableEdit={false}/>);
        const deleteButton = screen.getByRole("button", {name: "Delete note"}); 
        await user.click(deleteButton);
        expect(handleDelete).toHaveBeenCalled();
    });

    it("views Edit Form when a note is being edited", async () => {
        const handleEdit = vi.fn();
        render(<NoteList notes={mockNotes} onDelete={()=>{}} onEdit={handleEdit(mockNotes[0].id, "New text")} onSaveEditedNote={() => { }} onCancelEditNote={() => { }} editedNoteId={mockNotes[0].id} disableEdit={true}/>);
        expect(screen.getByRole("textbox", {name: "Edit note"})).toBeInTheDocument();
    });
})
import { render, screen } from "@testing-library/preact";
import { describe, expect, it, vi } from "vitest";
import { EditNoteForm } from "./EditNoteForm";
import userEvent from "@testing-library/user-event";

describe("Edit Note form component", () => {
    const mockNotes = [{
        id: 1, content: "Test Note", user_id: "user-1", created_at: new Date().toISOString(), updated_at: new Date().toISOString()
    }];

    it("renders edit form", () => {
        render(<EditNoteForm
            currentNote={mockNotes[0]}
            onSave={() => { }}
            onCancel={() => { }} />)
        expect(screen.getByLabelText("Edit note")).toHaveDisplayValue(mockNotes[0].content);
        expect(screen.getByRole("button", { name: "Save note" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Cancel edit note" })).toBeInTheDocument();
    })

    it("calls handleSave when save button is clicked", async () => {
        const handleSave = vi.fn();
        const user = userEvent.setup();
        render(<EditNoteForm
            currentNote={mockNotes[0]}
            onSave={handleSave}
            onCancel={() => { }} />)
        const saveButton = screen.getByRole("button", { name: "Save note" });
        await user.click(saveButton);
        expect(handleSave).toHaveBeenCalled();
    })

    it("calls handleCancel when cancel button is clicked", async () => {
        const handleCancel = vi.fn();
        const user = userEvent.setup();
        render(<EditNoteForm
            currentNote={mockNotes[0]}
            onSave={() => { }}
            onCancel={handleCancel} />)
        const cancelButton = screen.getByRole("button", { name: "Cancel edit note" });
        await user.click(cancelButton)
        expect(handleCancel).toHaveBeenCalled();
    })
})
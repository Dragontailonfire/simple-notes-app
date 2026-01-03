import { fireEvent, render, screen } from "@testing-library/preact";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NoteDetail } from "./NoteDetail";
import { notes } from "../store";
import * as storeModule from "../store";

vi.mock("wouter", () => ({
    useRoute: () => [true, { id: "1" }],
    Link: (props: any) => <a {...props}>{props.children}</a>,
    useLocation: () => ["/note/1", vi.fn()],
}));

vi.mock("../store", async (importOriginal) => {
    const actual = await importOriginal<typeof storeModule>();
    return {
        ...actual,
        updateNote: vi.fn(),
        deleteNote: vi.fn()
    };
});

describe("NoteDetail page", () => {
    beforeEach(() => {
        notes.value = [
            { id: 1, title: "Original Title", content: "Original Content", user_id: "u1", created_at: "", updated_at: "" }
        ];
        vi.clearAllMocks();
    });

    it("renders 'Note not found' if id does not exist", () => {
        notes.value = [];
        render(<NoteDetail />);
        expect(screen.getByText(/Note not found/i)).toBeInTheDocument();
    });

    it("updates note and enables/disables buttons based on dirty state", async () => {
        const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

        render(<NoteDetail />);
        const titleInput = screen.getByDisplayValue("Original Title");

        const saveBtn = screen.getByRole("button", { name: /Save changes/i });
        const cancelBtn = screen.getByRole("button", { name: /Cancel/i });
        const deleteBtn = screen.getByRole("button", { name: /Delete note/i });
        expect(saveBtn).toBeDisabled();
        expect(cancelBtn).toBeDisabled();
        expect(deleteBtn).not.toBeDisabled();
        
        fireEvent.input(titleInput, { target: { value: "New Title" } });
        expect(saveBtn).not.toBeDisabled();
        expect(cancelBtn).not.toBeDisabled();

        saveBtn.click();

        expect(storeModule.updateNote).toHaveBeenCalledWith(1, "Original Content", "New Title");

        deleteBtn.click();
        expect(confirmSpy).toHaveBeenCalled();
        expect(storeModule.deleteNote).toHaveBeenCalledWith(1);
    });
});
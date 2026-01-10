import { fireEvent, render, screen } from "@testing-library/preact";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NoteDetail } from "./NoteDetail";
import { notes } from "../store";
import * as storeModule from "../store";

vi.mock("wouter-preact", () => ({
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
        render(<NoteDetail />);
        const titleInput = screen.getByDisplayValue("Original Title");

        const saveBtn = screen.getByLabelText("Save changes");
        const clearBtn = screen.getByLabelText("Clear");
        const deleteBtn = screen.getByRole("button", { name: /Delete/i });
        expect(saveBtn).not.toBeVisible();
        expect(clearBtn).not.toBeVisible();
        expect(deleteBtn).not.toBeDisabled();

        fireEvent.input(titleInput, { target: { value: "New Title" } });
        expect(saveBtn).toBeVisible();
        expect(clearBtn).toBeVisible();

        saveBtn.click();

        expect(storeModule.updateNote).toHaveBeenCalledWith(1, "Original Content", "New Title");

        deleteBtn.click();
        expect(storeModule.deleteNote).toHaveBeenCalledWith(1);
    });
});
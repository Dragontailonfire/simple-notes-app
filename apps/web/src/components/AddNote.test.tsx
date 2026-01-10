import { render, screen } from "@testing-library/preact";
import { describe, expect, it, vi } from "vitest";
import { AddNote } from "./AddNote";
import userEvent from "@testing-library/user-event";

describe("Add Note component", () => {
  it("renders add form", async () => {
    const addNote = vi.fn();
    render(<AddNote onAddNote={addNote} />);
    expect(screen.getByPlaceholderText("Add a quick note...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add note/i })).toBeInTheDocument();
  });

  it("calls addNote function when Add button is clicked", async () => {
    const addNote = vi.fn();
    const user = userEvent.setup();
    render(<AddNote onAddNote={addNote} />);
    const addNoteTextField = screen.getByPlaceholderText("Add a quick note...");
    expect(addNoteTextField).toBeInTheDocument();
    await user.type(addNoteTextField, "New Note");
    expect(addNoteTextField).toHaveValue("New Note");
    const addButton = screen.getByRole("button", { name: /Add note/i });
    expect(addButton).toBeEnabled();
    await user.click(addButton);
    expect(addNote).toHaveBeenCalledOnce();
  });

  it("resets the text field when note is saved");
});

import type { Note } from "@template/shared-types";
import { NoteItem } from "./NoteItem";

interface NoteListProps {
    notes: Note[];
    selectedFoldersToView: number[];
}

export function NoteList({ notes, selectedFoldersToView }: NoteListProps) {
    const notesInFilter = notes.filter((note) =>
        selectedFoldersToView.includes(note.folderDetails.id),
    );

    if (notesInFilter.length === 0) {
        return (
            <div class="p-5 text-center rounded-0 bg-warning-subtle">
                <h1 class="text-body-emphasis fw-bolder p-5">
                    No notes added!
                </h1>
            </div>
        );
    }
    return (
        <div class="row gy-4 row-cols-auto justify-content-evenly">
            {notesInFilter.map((note: Note) => (
                <div class="col" key={note.id}>
                    <NoteItem note={note} />
                </div>
            ))}
        </div>
    );
}

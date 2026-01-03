import type { Note } from "@template/shared-types"
import { NoteItem } from "./NoteItem";

interface NoteListProps {
    notes: Note[]
}

export function NoteList({ notes }: NoteListProps) {
    return (
        <div class="row g-2 justify-content-center">
            {notes.map((note: Note) => (
                <div class="col-auto">
                    <NoteItem note={note} />
                </div>
            ))}
        </div>
    )
}
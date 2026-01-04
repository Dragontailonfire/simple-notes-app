import type { Note } from "@template/shared-types"
import { NoteItem } from "./NoteItem";

interface NoteListProps {
    notes: Note[]
}

export function NoteList({ notes }: NoteListProps) {
    return (
        <div class="row gy-4 row-cols-auto justify-content-evenly">
            {notes.map((note: Note) => (
                <div class="col">
                    <NoteItem note={note} />
                </div>
            ))}
        </div>
    )
}
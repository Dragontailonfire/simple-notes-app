import type { Note } from "@template/shared-types"
import { EditNoteForm } from "./EditNoteForm"
import { NoteItem } from "./NoteItem";

interface NoteListProps {
    notes: Note[],
    onDelete: (id: number) => void,
    onEdit: (id: number, content: string) => void,
    onSaveEditedNote: (newContent: string, newTitle: string) => void
    onCancelEditNote: () => void
    disableEdit: boolean
    editedNoteId: number | null
}

export function NoteList({ notes, onDelete, onEdit, onSaveEditedNote, onCancelEditNote, editedNoteId, disableEdit }: NoteListProps) {
    return (
        <div class="row g-2 justify-content-center">
            {notes.map((note: Note) => (
                <div class="col-auto">
                    {editedNoteId === note.id ? (
                        <EditNoteForm
                            currentNote={note}
                            onSave={onSaveEditedNote}
                            onCancel={onCancelEditNote} />
                    ) : (
                        <NoteItem note={note} disableEdit={disableEdit} onEdit={onEdit} onDelete={onDelete} />
                    )}
                </div>
            ))}
        </div>
    )
}
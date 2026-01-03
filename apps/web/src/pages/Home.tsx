import { useSignal } from "@preact/signals";
import { NoteList } from "../components/NoteList";
import { notes, deleteNote, updateNote } from "../store";

export function Home() {
    const editedNote = useSignal<string>("");
    const editedNoteId = useSignal<number | null>(null);

    const editANote = (id: number, content: string) => {
        editedNoteId.value = id;
        editedNote.value = content ?? "";
    };

    const saveEditedNote = async (newContent: string, newTitle: string) => {
        if (editedNoteId.value === null) return;
        const success = await updateNote(editedNoteId.value, newContent, newTitle);
        if (success) {
            editedNoteId.value = null;
            editedNote.value = "";
        }
    };

    const cancelEdit = () => {
        editedNoteId.value = null;
        editedNote.value = "";
    };

    return (
        <div class="container text-center mt-5">
            <NoteList
                notes={notes.value}
                onDelete={deleteNote}
                onEdit={editANote}
                onSaveEditedNote={saveEditedNote}
                onCancelEditNote={cancelEdit}
                editedNoteId={editedNoteId.value}
                disableEdit={editedNoteId.value !== null}
            />
        </div>
    );
}
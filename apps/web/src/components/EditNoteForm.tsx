import { useSignal } from "@preact/signals";
import type { Note } from "@template/shared-types";

interface EditNoteFormProps {
    currentNote: Note
    onSave: (newContent: string) => void
    onCancel: () => void
}

export function EditNoteForm({ currentNote, onSave, onCancel }: EditNoteFormProps) {
    const content = useSignal(currentNote.content);

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        onSave(content.value);
    }
    return (
        <div key={currentNote.id} class="card mb-3 border-0 rounded shadow">
            <div class="card-body">
                <form onSubmit={handleSubmit}>
                    <div class="hstack">
                        <div class="p-2 flex-grow-1">
                            <input value={content.value} onInput={(e) => (content.value = e.currentTarget.value)} class="form-control" id="edit-note" name="edit-note" aria-label="Edit note" />
                        </div>
                        <div class="p-2 ms-auto">
                            <button type="submit" class="btn btn-sm btn-success" aria-label="Save note"><svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="20"
                                fill="currentColor"
                                class="bi bi-floppy"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11 2H9v3h2z" />
                                <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                            </svg>
                            </button>
                        </div>
                        <div class="vr"></div>
                        <div class="p-2">
                            <button
                                type="reset"
                                class="btn btn-sm btn-outline-danger"
                                onClick={onCancel}
                                aria-label="Cancel edit note"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="20"
                                    fill="currentColor"
                                    class="bi bi-x-circle"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="card-footer text-body-secondary fw-lighter">
                Created on: {new Date(currentNote.created_at).toLocaleString()}
            </div>
        </div>
    )
}
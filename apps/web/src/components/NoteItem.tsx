import type { Note } from "@template/shared-types"

interface NoteItemProps {
    note: Note
    onEdit: (id: number, content: string) => void
    onDelete: (id: number) => void
    disableEdit: boolean
}
export function NoteItem({ note, disableEdit, onEdit, onDelete }: NoteItemProps) {

    return (
        <div key={note.id} class="card mb-3 rounded text-start">
            {/* <div class="card-header text-end">                
            </div> */}
            <div class="card-body shadow-sm">
                <h5 class="card-title">{note.title}</h5>
                <div class="hstack">
                    <div class="p-2">
                        <p class="card-text">{note.content}</p>
                    </div>
                    <div class="p-2 ms-auto">
                        <button
                            class="btn btn-sm btn-outline-primary"
                            onClick={() => onEdit(note.id, note.content)}
                            aria-label="Edit note"
                            disabled={disableEdit}
                            aria-disabled={
                                disableEdit ? "true" : "false"
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="20"
                                fill="currentColor"
                                class="bi bi-pen"
                                viewBox="0 0 16 16"
                            >
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                            </svg>
                        </button>
                    </div>
                    <div class="vr"></div>
                    <div class="p-2">
                        <button
                            class="btn btn-sm btn-outline-danger"
                            onClick={() => onDelete(note.id)}
                            aria-label="Delete note"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="20"
                                fill="currentColor"
                                class="bi bi-trash"
                                viewBox="0 0 16 16"
                            >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="badge text-bg-primary text-wrap">
                    new
                </div>
            </div>
            <div class="card-footer text-body-secondary fw-lighter">
                Modified on: {new Date(note.updated_at).toLocaleString()}
            </div>
        </div>
    )
}
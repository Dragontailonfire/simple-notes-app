import { Link, useLocation, useRoute } from "wouter-preact"
import { deleteNote, notes, updateNote } from "../store";
import { useState } from "preact/hooks";

export function NoteDetail() {
    const [match, params] = useRoute("/note/:id");
    const [_, setLocation] = useLocation();

    const noteId = params?.id ? parseInt(params.id, 10) : null;
    const note = notes.value.find((n) => n.id === noteId);

    if (!note || !match) {
        return (
            <div class="p-5 text-center rounded bg-warning-subtle">
                <h1 class="text-body-emphasis fw-bolder p-5">Note not found! </h1>
                <Link href="/" class="btn btn-primary">Go Home</Link>
            </div>
        )
    }

    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const isDirty = (title !== note.title) || (content !== note.content);

    const onSave = async (e: Event) => {
        e.preventDefault();
        if (!isDirty) return;

        const success = await updateNote(note.id, content, title);
        if (success) {
            alert("Saved!");
        }
    };

    const onDelete = async () => {
        const success = await deleteNote(note.id);
        if (success) {
            setLocation("/");
        }
    };

    const onClear = () => {
        setTitle(note.title);
        setContent(note.content);
    };

    return (
        <div key={note.id} class="card border-0 h-100">
            <form onSubmit={onSave}>
                <div class="card-header border-5 shadow-sm rounded-3">
                    <div class="row row-cols-auto justify-content-between g-3">
                        <div class="col">
                            <Link href="/" class="btn btn-sm btn-outline-secondary border">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-chevron-left"
                                    viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"></path>                                    </svg> Back
                            </Link>
                        </div>
                        <div class="col">
                            <button
                                type="submit"
                                role="button"
                                class="btn btn-sm btn-primary"
                                aria-label="Save changes"
                                hidden={!isDirty}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-floppy"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11 2H9v3h2z" />
                                    <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
                                </svg> Save changes
                            </button>
                        </div>
                        <div class="col">
                            <button
                                type="button"
                                class="btn btn-sm btn-outline-danger"
                                aria-label="Clear"
                                onClick={onClear}
                                hidden={!isDirty}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-x-circle"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg> Clear
                            </button>
                        </div>
                        <div class="col">
                            <button
                                type="button"
                                class="btn btn-sm btn-danger"
                                aria-label="Delete"
                                onClick={onDelete}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-trash"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                </svg> Delete
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body border-0">
                    <div class="card-title">
                        <input
                            value={title}
                            onInput={(e) => setTitle(e.currentTarget.value)}
                            class="form-control form-control-lg border" />
                    </div>
                    <div class="card-text">
                        <textarea
                            value={content}
                            onInput={(e) => setContent(e.currentTarget.value)}
                            class="form-control form-control-lg border"
                            rows={10}
                        />
                    </div>
                </div>
                <div class="card-footer border-0 shadow-sm rounded-3 text-body-secondary fw-light">
                    <div class="row row-cols-auto justify-content-between">
                        <small class="col font-monospace">
                            Last updated: {new Date(note.updatedAt).toLocaleString()}
                        </small>
                        <small class="col font-monospace">
                            Created on: {new Date(note.createdAt).toLocaleString()}
                        </small>
                    </div>
                </div>
            </form>
        </div>
    )

}
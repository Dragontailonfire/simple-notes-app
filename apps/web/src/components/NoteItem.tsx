import type { Note } from "@template/shared-types"
import { Link } from "wouter-preact"

interface NoteItemProps {
    note: Note
}


export function NoteItem({ note }: NoteItemProps) {
    return (
        <div key={note.id} class="card text-start h-100 border" style="max-width: 18rem;">
            <div class="card-header border-0 shadow-sm">
                <Link
                    class="card-title icon-link icon-link-hover text-decoration-none text-reset stretched-link fw-medium"
                    href={`/note/${note.id}`}
                >
                    {note.title} {" "}
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="bi"
                        viewBox="0 0 16 16"
                        aria-hidden="true">
                        <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                    </svg>
                </Link>
            </div>
            <div class="card-body border-0 shadow-sm">
                <p class="card-text fw-light text-break text-truncate">
                    {note.content}
                </p>
            </div>
            <div class="card-footer border-0 shadow-sm bg-transparent">
                <small class="fw-lighter text-body-secondary">
                    Last updated {new Date(note.updated_at).toLocaleString()}
                </small>
            </div>
        </div>
    )
}
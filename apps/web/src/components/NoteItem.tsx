import type { Note } from "@template/shared-types"
import { Link } from "wouter"

interface NoteItemProps {
    note: Note
}


export function NoteItem({ note }: NoteItemProps) {
    return (
        <div key={note.id} class="card border text-start">
            <div class="card-body">
                <h5 class="card-title">
                    <Link class="card-title text-decoration-none text-reset stretched-link" href={`/note/${note.id}`}>
                        {note.title}
                    </Link>
                </h5>

                <small class="card-subtitle fw-lighter text-body-secondary">
                    Last updated: {new Date(note.updated_at).toLocaleString()}
                </small>
                <p class="card-text mb-3">{note.content}</p>
            </div>
        </div>
    )
}
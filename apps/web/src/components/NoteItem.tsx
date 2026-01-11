import type { Note } from "@template/shared-types"
import { Link } from "wouter-preact"

interface NoteItemProps {
    note: Note
}


export function NoteItem({ note }: NoteItemProps) {
    return (
        <Link
            class="text-decoration-none text-reset stretched-link position-relative"
            href={`/note/${note.id}`}>
            <div class="card text-start h-100 border" style="max-width: 18rem;">
                <div class="card-header border-0 shadow-sm">
                    <div class="card-title fw-medium">
                        {note.title}
                    </div>
                </div>
                <div class="card-body border-0 shadow-sm">
                    <p class="card-text fw-light text-break text-truncate">
                        {note.content}
                    </p>
                </div>
                <div class="card-footer border-0 shadow-sm bg-transparent">
                    <small class="fw-lighter text-body-secondary">
                        Last updated {new Date(note.updatedAt).toLocaleString()}
                    </small>
                </div>
            </div>
        </Link>
    )
}
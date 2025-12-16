import { Signal } from "@preact/signals";
import type { FunctionalComponent } from "preact";

interface AddNoteProps {
  newNoteSignal: Signal<string>;
  onAddNote: () => void;
}

export const AddNote: FunctionalComponent<AddNoteProps> = ({
  newNoteSignal,
  onAddNote,
}) => {
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    onAddNote();
  };
  return (
    <div class="row mt-5">
      <div class="col mt-5">
        <form onSubmit={handleSubmit}>
          <div class="input-group mb-3">
            <span class="input-group-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="24"
                fill="currentColor"
                class="bi bi-file-text-fill"
                viewBox="0 0 16 16"
              >
                <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
              </svg>
            </span>
            <input
              id="add-note"
              name="add-note"
              value={newNoteSignal.value}
              onInput={(e) => (newNoteSignal.value = e.currentTarget.value)}
              placeholder="Add a new note..."
              class="form-control form-control-lg"
              type="text"
              aria-label="Add new note"
            />
            <button
              type="submit"
              class="btn btn-lg btn-primary"
              aria-label="Add note"
              disabled={newNoteSignal.value === ""}
              aria-disabled={newNoteSignal.value === "" ? "true" : "false"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import { useSignal } from "@preact/signals";
import type { FunctionalComponent } from "preact";

interface AddNoteProps {
  onAddNote: (content: string) => Promise<boolean>;
}

export const AddNote: FunctionalComponent<AddNoteProps> = ({
  onAddNote
}) => {
  const content = useSignal<string>("");
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const success = await onAddNote(content.value);
    if (success) {
      content.value = "";
    }
  };
  return (
    <div class="row mtt-5">
      <div class="col mtt-5">
        <form onSubmit={handleSubmit}>
          <div class="input-group mtb-3">
            {/* <span class="input-group-text">
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
            </span> */}
            <input
              id="add-note"
              name="add-note"
              value={content.value}
              onInput={(e) => (content.value = e.currentTarget.value)}
              placeholder="Add a new note..."
              class="form-control form-control-ltg"
              type="text"
              aria-label="Add new note"
            />
            <button
              type="submit"
              class="btn btn-ltg btn-primary"
              aria-label="Add note"
              disabled={content.value === ""}
              aria-disabled={content.value === "" ? "true" : "false"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="20"
                fill="currentColor"
                class="bi bi-plus-lg"
                viewBox="0 0 16 16"
              >
                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

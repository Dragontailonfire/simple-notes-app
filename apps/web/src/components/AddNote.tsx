import { useSignal } from "@preact/signals";
import type { FunctionalComponent } from "preact";

interface AddNoteProps {
    onAddNote: (content: string) => Promise<boolean>;
}

export const AddNote: FunctionalComponent<AddNoteProps> = ({ onAddNote }) => {
    const content = useSignal<string>("");
    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        const success = await onAddNote(content.value);
        if (success) {
            content.value = "";
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div class="input-group">
                    {/*<FoldersDropDownSelector
                        folders={folderTree.value}
                        currentFolder="Home"
                    />*/}
                    <input
                        id="add-note"
                        name="add-note"
                        value={content.value}
                        onInput={(e) => (content.value = e.currentTarget.value)}
                        placeholder="Add a quick note..."
                        class="form-control form-control-sm rounded-0 w-50"
                        type="text"
                        aria-label="Add new note"
                    />
                    <button
                        type="submit"
                        class="btn btn-sm btn-primary rounded-0"
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
                            <path
                                fill-rule="evenodd"
                                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </>
    );
};

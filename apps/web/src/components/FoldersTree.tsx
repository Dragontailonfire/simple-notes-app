import type { FolderTreeDto } from "@template/shared-types";
import { FoldersTreeItem } from "./FoldersTreeItem";
import { setAllFoldersToView } from "../store";

interface FoldersTreeProps {
    folders: FolderTreeDto[];
}

export function FoldersTree({ folders }: FoldersTreeProps) {
    return (
        <>
            <div
                id="folderTree"
                class="collapse show overflow-scroll bg-body-tertiary shadow-sm"
            >
                <div class="list-group">
                    <button
                        type="button"
                        class="list-group-item list-group-item-action rounded-0"
                        onClick={setAllFoldersToView}
                    >
                        All notes
                    </button>
                    {folders.map((folder) => (
                        <FoldersTreeItem folder={folder} key={folder.id} />
                    ))}
                </div>
            </div>
        </>
    );
}

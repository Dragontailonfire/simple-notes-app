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
                class="collapse show overflow-scroll shadow-sm mt-2"
            >
                <div class="list-group">
                    <button
                        type="button"
                        class="list-group-item list-group-item-action shadow-sm"
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

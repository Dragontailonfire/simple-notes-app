import type { FolderTreeDto } from "@template/shared-types";
import { FoldersTreeItem } from "./FoldersTreeItem";
import { setAllFoldersToView } from "../store";

interface FoldersTreeProps {
    folders: FolderTreeDto[];
}

export function FoldersTree({ folders }: FoldersTreeProps) {
    return (
        <>
            <div id="folderTree" class="collapse show overflow-scroll">
                <div class="bg-primary-subtle p-3 rounded-4 shadow-sm">
                    <div class="list-group rounded">
                        <button
                            type="button"
                            class="list-group-item list-group-item-action rounded-4"
                            onClick={setAllFoldersToView}
                        >
                            All folders
                        </button>
                        <hr class="border border-primary border-1 rounded opacity-50" />
                        {folders.map((folder) => (
                            <div key={folder.id}>
                                <FoldersTreeItem folder={folder} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

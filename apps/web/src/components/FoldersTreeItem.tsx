import type { FolderTreeDto } from "@template/shared-types";
import { setFolderToView } from "../store";

interface FoldersTreeItemProps {
    folder: FolderTreeDto;
}

export function FoldersTreeItem({ folder }: FoldersTreeItemProps) {
    return (
        <>
            <button
                type="button"
                class="list-group-item list-group-item-action shadow-sm"
                onClick={() => setFolderToView(folder.id)}
            >
                {folder.name}
            </button>
            {folder.children.map((child) => (
                <div class="ms-3" key={child.id}>
                    <FoldersTreeItem folder={child} />
                </div>
            ))}
        </>
    );
}

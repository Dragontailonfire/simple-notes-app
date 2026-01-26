import type { FolderTreeDto } from "@template/shared-types";
import { FoldersDropDownSelectorItem } from "./FoldersDropDownSelectorItem";
import { useSignal } from "@preact/signals";

interface FoldersDropDownSelectorProps {
    currentFolder: string;
    folders: FolderTreeDto[];
}

export function FoldersDropDownSelector({
    folders,
    currentFolder,
}: FoldersDropDownSelectorProps) {
    const folderName = useSignal<string>(currentFolder);
    return (
        <>
            <select
                name="folder-selector"
                aria-label="Folder selector for note"
                class="form-select form-select-sm rounded-4"
            >
                <option selected value={folderName}>
                    {folderName}
                </option>
                <hr />
                {folders.map((folder) => (
                    <FoldersDropDownSelectorItem
                        folder={folder}
                        key={folder.id}
                    />
                ))}
            </select>
        </>
    );
}

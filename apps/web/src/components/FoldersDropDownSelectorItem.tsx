import type { FolderTreeDto } from "@template/shared-types";

interface FoldersDropDownSelectorItemProps {
    folder: FolderTreeDto;
}

export function FoldersDropDownSelectorItem({
    folder,
}: FoldersDropDownSelectorItemProps) {
    if (folder.children.length === 0) {
        return (
            <>
                <option value={folder.id}>{folder.name}</option>
                <hr />
            </>
        );
    }

    return (
        <>
            <option value={folder.id}>{folder.name}</option>
            {folder.children.map((child) => (
                <FoldersDropDownSelectorItem folder={child} />
            ))}
        </>
    );
}

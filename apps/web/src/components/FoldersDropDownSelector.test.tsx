import { render, screen } from "@testing-library/preact";
import { describe, expect, it } from "vitest";
import { FoldersDropDownSelector } from "./FoldersDropDownSelector";

describe("Notes folders drop down selector component", () => {
    const mockFolderTree = [
        {
            id: 1,
            name: "Test Folder 1",
            parentId: null,
            userId: "user-1",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            children: [],
        },
    ];
    it("renders folders tree structure", () => {
        render(
            <FoldersDropDownSelector
                folders={mockFolderTree}
                currentFolder={mockFolderTree[0].name}
            />,
        );
        expect(
            screen.getByLabelText(/Folder selector for note/i),
        ).toBeInTheDocument();
    });
});

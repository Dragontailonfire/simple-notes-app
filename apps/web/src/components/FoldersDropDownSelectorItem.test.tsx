import { render, screen } from "@testing-library/preact";
import { describe, expect, it } from "vitest";
import { FoldersDropDownSelectorItem } from "./FoldersDropDownSelectorItem";

describe("Notes folders drop down selector item component", () => {
    const mockFolderTree = {
        id: 1,
        name: "Test Folder 1",
        parentId: null,
        userId: "user-1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        children: [],
    };
    it("renders folders tree structure", () => {
        render(<FoldersDropDownSelectorItem folder={mockFolderTree} />);
        expect(screen.getByText(mockFolderTree.name)).toBeInTheDocument();
    });
});

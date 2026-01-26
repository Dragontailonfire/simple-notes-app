import { render, screen } from "@testing-library/preact";
import { describe, expect, it } from "vitest";
import { FoldersTreeItem } from "./FoldersTreeItem";

describe("Notes folders tree item component", () => {
    const mockFolderTreeItem = {
        id: 1,
        name: "Test Folder 1",
        parentId: null,
        userId: "user-1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        children: [],
    };
    it("renders folders tree item", () => {
        render(<FoldersTreeItem folder={mockFolderTreeItem} />);
        expect(screen.getByText("Test Folder 1")).toBeInTheDocument();
    });
});

import { render, screen } from "@testing-library/preact";
import { describe, expect, it } from "vitest";
import { FoldersTree } from "./FoldersTree";

describe("Notes folders tree component", () => {
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
        render(<FoldersTree folders={mockFolderTree} />);
        expect(
            screen.getByRole("button", { name: /All folders/i }),
        ).toBeInTheDocument();
    });
});

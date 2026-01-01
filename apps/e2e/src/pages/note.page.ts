import type { Locator, Page } from "@playwright/test";

export class NotePage {
    private readonly addNoteInputBox: Locator;
    private readonly addNoteButton: Locator;

    constructor(public readonly page: Page) {
        this.addNoteInputBox = this.page.getByRole("textbox", { name: "Add new note" });
        this.addNoteButton = this.page.getByRole("button", { name: "Add note" });
    }

    async goto() {
        await this.page.goto("");
    }

    async addNote(content: string) {
        await this.addNoteInputBox.fill(content);
        await this.addNoteButton.click();
    }

    async removeNote(content: string) {
        const note = this.page.getByText(content);
        await note.hover();
        this.page.on('dialog', dialog => dialog.accept());
        await this.page.locator('.card-body').filter({ hasText: content }).getByRole("button", { name: "Delete note" }).click();
    }
}
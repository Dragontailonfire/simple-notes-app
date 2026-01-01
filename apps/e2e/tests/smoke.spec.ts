import { test, expect } from "@core/fixtures/note.fixture";

test.describe("Smoke tests for Simple Notes App", () => {

    const NOTE_ITEMS = [
        "buy some cheese",
        "book a movie ticket",
    ] as const;

    NOTE_ITEMS.forEach(note => {
        test(`should allow me to add and delete note: '${note}'`, async ({ notePage, page }) => {
            await notePage.addNote(note);
            await expect(page.getByText(note)).toBeVisible();
            await notePage.removeNote(note);
            await expect(page.getByText(note)).not.toBeVisible();
        })
    });
})
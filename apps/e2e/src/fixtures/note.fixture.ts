import { NotePage } from "@core/pages/note.page";
import { test as base, expect } from "@playwright/test";

type NoteFixtures = {
    notePage: NotePage;
}

export const test = base.extend<NoteFixtures>({
    notePage: async ({ page }, use) => {
        const notePage = new NotePage(page);
        notePage.goto();
        await use(notePage);
    }
});

export { expect };


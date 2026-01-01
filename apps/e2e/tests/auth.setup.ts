import { expect, test as setup } from "@playwright/test";
import path from "path";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup.skip("authenticate gihub user", async ({ page }) => {
    await page.goto("");
    await page.getByRole("button", { name: "Sign in with GitHub" }).click();
    // TODO: Handle auth steps.
    await expect(page.getByText(/Hello, /)).toBeVisible();

    await page.context().storageState({ path: authFile });
})
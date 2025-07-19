import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Cookie modal selectors and methods
  async handleCookiesModal() {
    await this.page.waitForLoadState('domcontentloaded');

    const cookieSelectors = [
      '#onetrust-accept-btn-handler',
      '.cookie-accept',
      'button:has-text("Accept")',
      'button:has-text("Прийняти")',
      'button:has-text("Accept all")',
      '[data-testid="cookie-accept"]'
    ];

    for (const selector of cookieSelectors) {
      try {
        const element = this.page.locator(selector);
        if (await element.isVisible({ timeout: 3000 })) {
          await element.click();
          console.log('Cookie modal handled successfully');
          return;
        }
      } catch (error) {
        continue;
      }
    }

    console.log('No cookie modal found or already handled');
  }
}

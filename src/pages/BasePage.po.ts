import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly rejectCookiesButton: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rejectCookiesButton = page.locator('button#onetrust-reject-all-handler');
    this.continueButton = page.locator('button[data-qa-action="go-to-store"]');
  }

  async clickRejectCookies() {
    await this.rejectCookiesButton.click();
  }

  async clickOnContinueButton() {
    await this.continueButton.click();
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}




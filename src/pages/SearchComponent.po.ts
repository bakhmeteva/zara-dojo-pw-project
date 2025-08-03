import { Page, Locator } from '@playwright/test';

export class SearchComponent {
  readonly page: Page;
  readonly filterBtn: Locator;
  readonly filterField: Locator;


  constructor(page: Page) {
    this.page = page;
    this.filterBtn = page.locator('[data-qa-id="header-search-text-link"]');
    this.filterField = page.locator('#search-home-form-combo-input');
  }


  async searchProductByName(productName: string) {
    await this.filterBtn.click();
    await this.filterField.fill(productName);
    await this.filterField.press(`Enter`);
  }
}
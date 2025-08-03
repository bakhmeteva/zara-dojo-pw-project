import { Page, Locator, expect } from '@playwright/test';

export class SearchResultPage {
  readonly page: Page;
  //readonly productItems: Locator;
  //readonly productLinks: Locator;
  //readonly loadMoreButton: Locator;
  //readonly resultsCount: Locator;
  //readonly noResultsMessage: Locator;
  readonly addToBagButtons: Locator;
  readonly sizeButtons: Locator;
  //readonly sizeModal: Locator;
  readonly shoppingBag: Locator;
  readonly items: Locator;


  constructor(page: Page) {
    this.page = page;
    this.addToBagButtons = page.locator('button[data-qa-action="product-grid-open-size-selector"]');
    this.sizeButtons = page.locator('button[data-qa-action="size-in-stock"]');
    this.shoppingBag = page.locator('[data-qa-id="layout-header-go-to-cart-items-count"]');
    this.items = page.locator(`.product-grid-product`);

  }

  async clickCloseConfirmSelect() {
    await this.page.locator(`button[aria-label="close"]`).click();
  }

  /**
   * Метод для вибору різних розмірів товару в циклі
   * @returns Масив назв обраних розмірів
   */
  async selectSizesOfAnyItemFromSearchResult(sizesCount: number): Promise<string[]> {
    const selectedSizes: string[] = [];
    await expect(this.addToBagButtons.first()).toBeVisible({ timeout: 5000 });
    const dresses = await this.items.all();
    for (const dress of dresses) {
      await dress.locator(this.addToBagButtons).click();
      await expect(dress.locator(this.sizeButtons).first()).toBeVisible({ timeout: 5000 });
      const availableSizes = await dress.locator(this.sizeButtons).all();
      if (availableSizes.length >= sizesCount) {
        for (let i = 0; i < sizesCount; i++) {
          selectedSizes.push(await availableSizes[i].innerText());
          await availableSizes[i].click();
          await this.clickCloseConfirmSelect();
          await dress.locator(this.addToBagButtons).click();
        }
        return selectedSizes;
      }
    }
    expect(false, `Found dress with 4 available Sizes`).toBeTruthy();
    return selectedSizes;
  }

  async clickOnShoppingBag() {
    await this.shoppingBag.click();
  }
}

import { Page, Locator, expect } from '@playwright/test';

export class SearchResultPage {
  readonly page: Page;
  readonly productItems: Locator;
  readonly productLinks: Locator;
  readonly loadMoreButton: Locator;
  readonly resultsCount: Locator;
  readonly noResultsMessage: Locator;
  readonly addToBagButtons: Locator;
  readonly sizeButtons: Locator;
  readonly sizeModal: Locator;
  readonly shoppingBag: Locator;


  constructor(page: Page) {
    this.page = page;
    this.productItems = page.locator('.product-item, .product-card, [data-testid="product"]');
    this.productLinks = page.locator('.product-link, .product-item a, [data-testid="product-link"]');
    this.loadMoreButton = page.locator('.load-more, [data-testid="load-more"], button:has-text("Load more")');
    this.resultsCount = page.locator('.results-count, .search-results-count');
    this.noResultsMessage = page.locator('.no-results, .empty-results');
    this.addToBagButtons = page.locator('button[data-qa-action="product-grid-open-size-selector"]');
    this.sizeButtons = page.locator('button[data-qa-action="size-in-stock"]');
    this.sizeModal = page.locator('[data-testid="size-selector-modal"], .size-modal, .size-selector');
    this.shoppingBag = page.locator('[data-qa-id="layout-header-go-to-cart-items-count"]');

  }

  async waitForResults() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.productItems.first()).toBeVisible({ timeout: 10000 });
  }

  async getProductCount(): Promise<number> {
    await this.waitForResults();
    return this.productItems.count();
  }

  async clickOnProduct(index: number = 0) {
    await this.productLinks.nth(index).click();
  }

  async clickFirstAvailableProduct() {
    const productCount = await this.getProductCount();
    if (productCount > 0) {
      await this.clickOnProduct(0);
    } else {
      throw new Error('No products found in search results');
    }
  }

  async clickAddToBagButton(productName: string) {
    await expect(this.addToBagButtons.first()).toBeVisible({ timeout: 5000 });
    const product = this.page.locator(`xpath=.//h3[text()='${productName}']/ancestor::li[contains(@class, "product-grid-product")]`);
    const button = product.locator(this.addToBagButtons);
    await expect(button).toBeVisible();
    await button.click();
  }

  async clickOnSize(size: string) {
    await this.page.locator(`xpath=.//button//div[text() = "${size}"]`).click();
  }

  async clickCloseConfirmSelect() {
    await this.page.locator(`button[aria-label="close"]`).click();
  }

  /**
   * Метод для вибору різних розмірів товару в циклі
   * @param productName
   * @param sizes - масив розмірів
   */
  async selectDifferentSizes(productName: string, ...sizes: string[]) {
    for (const size of sizes) {
      await this.clickAddToBagButton(productName);
      // Очікуємо появи модального вікна з розмірами
      await expect(this.sizeModal).toBeVisible({ timeout: 5000 });
      await this.clickOnSize(size);
      await this.clickCloseConfirmSelect();
    }
  }

  async clickOnShoppingBag (){
    await this.shoppingBag.click();
  }
}

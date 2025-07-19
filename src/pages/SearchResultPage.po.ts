import { Page, Locator, expect } from '@playwright/test';

export class SearchResultPage {
  readonly page: Page;
  readonly productItems: Locator;
  readonly productLinks: Locator;
  readonly loadMoreButton: Locator;
  readonly resultsCount: Locator;
  readonly noResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productItems = page.locator('.product-item, .product-card, [data-testid="product"]');
    this.productLinks = page.locator('.product-link, .product-item a, [data-testid="product-link"]');
    this.loadMoreButton = page.locator('.load-more, [data-testid="load-more"], button:has-text("Load more")');
    this.resultsCount = page.locator('.results-count, .search-results-count');
    this.noResultsMessage = page.locator('.no-results, .empty-results');
  }

  async waitForResults() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.productItems.first()).toBeVisible({ timeout: 10000 });
  }

  async getProductCount(): Promise<number> {
    await this.waitForResults();
    return await this.productItems.count();
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

  async loadMoreProducts() {
    if (await this.loadMoreButton.isVisible()) {
      await this.loadMoreButton.click();
      await this.page.waitForLoadState('networkidle');
    }
  }
}
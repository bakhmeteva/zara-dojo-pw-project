import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cardItem: Locator;
  readonly continueButton: Locator;
  readonly itemSize: Locator;
  readonly decreaseQuantityButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cardItem = page.locator('.shop-cart-item');
    this.continueButton = page.locator('[data-qa-id="shop-continue"]');
    this.itemSize = page.locator('.shop-cart-item-details-base__size');
    this.decreaseQuantityButton = page.locator('.zds-quantity-selector__decrease');
  }


  async verifyCartItemsCount(itemsCount: number) {
    await this.cardItem.first().waitFor({ state: 'visible' });
    const items = await this.cardItem.all();
    expect(items.length).toBe(itemsCount);
  }

  async deleteItemBySize(...partNames: string[]) {
    for (const partName of partNames) {
      const items = await this.cardItem.all();

      for (const item of items) {
        const itemText = await item.locator(this.itemSize).textContent();

        // видаляємо переноси строк для WebKit
        const cleanItemText = itemText ? itemText.replace(/\n/g, '').trim() : '';
        const cleanPartName = partName.replace(/\n/g, '').trim();
        
        if (cleanItemText === cleanPartName) {
          await item.locator(this.decreaseQuantityButton).click();
          await this.page.waitForTimeout(300);
          break;
        }
      }
    }
  }

  async clickToContinueButton(): Promise<void> {
    await this.continueButton.click();
  }
}

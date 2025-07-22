import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly checkoutButton: Locator;
  readonly cardItem: Locator;


  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator('.shopping-bag, .cart-icon, [data-testid="cart"], a[href*="cart"], button:has-text("Cart")');
    this.checkoutButton = page.locator('button:has-text("Checkout"), button:has-text("Proceed"), button:has-text("Оформити замовлення"), .checkout-button, [data-testid="checkout"]');
    this.cardItem = page.locator('.shop-cart-item');
  }

  async goToCart() {
    if (await this.cartIcon.isVisible({ timeout: 3000 })) {
      await this.cartIcon.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async proceedToCheckout() {
    if (await this.checkoutButton.isVisible({ timeout: 5000 })) {
      await this.checkoutButton.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async verifyCartItemsCount(itemsCount: number) {
    await this.cardItem.first().waitFor({ state: 'visible' });
    const items = await this.cardItem.all();
    expect(items.length).toBe(itemsCount);
  }

  async deleteItemBySize(...partNames: string[]) {
    for (const partName of partNames) {
      // Перечитуємо елементи після кожного видалення
      const items = await this.cardItem.all();

      for (const item of items) {
        const itemText = await item.locator('.shop-cart-item-details-base__size').textContent();
        if (itemText?.trim() === partName) {
          console.log(`Deleting item: ${partName}`);
          await item.locator('.zds-quantity-selector__decrease').click();
          await this.page.waitForTimeout(200);
          break; // після видалення — до наступного partName
        }
      }
    }
  }

  async clickToContinueButton(): Promise<void> {
    await this.page.locator('[data-qa-id="shop-continue"]').click();
  }



}

import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator('.shopping-bag, .cart-icon, [data-testid="cart"], a[href*="cart"], button:has-text("Cart")');
    this.checkoutButton = page.locator('button:has-text("Checkout"), button:has-text("Proceed"), button:has-text("Оформити замовлення"), .checkout-button, [data-testid="checkout"]');
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
}

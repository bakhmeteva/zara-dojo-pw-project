import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly sizeButtons: Locator;
  readonly addToCartButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sizeButtons = page.locator('.size-selector button, .sizes button, [data-testid="size"] button, .product-size-selector button');
    this.addToCartButton = page.locator('button:has-text("Add to cart"), button:has-text("Додати до кошика"), .add-to-cart, [data-testid="add-to-cart"]');
    this.continueShoppingButton = page.locator('button:has-text("Continue shopping"), button:has-text("Продовжити покупки"), .continue-shopping, .modal-close');
  }

  async addAllSizesToCart() {
    await this.page.waitForLoadState('networkidle');

    const sizeCount = await this.sizeButtons.count();

    if (sizeCount > 0) {
      console.log(`Found ${sizeCount} sizes`);

      for (let i = 0; i < sizeCount; i++) {
        try {
          // Select size
          await this.sizeButtons.nth(i).click();
          await this.page.waitForTimeout(1000);

          // Add to cart
          if (await this.addToCartButton.isVisible({ timeout: 3000 })) {
            await this.addToCartButton.click();
            await this.page.waitForTimeout(2000);

            // Handle modal after adding to cart
            if (await this.continueShoppingButton.isVisible({ timeout: 2000 })) {
              await this.continueShoppingButton.click();
            }
          }
        } catch (error) {
          console.log(`Could not add size ${i + 1} to cart:`, error);
          continue;
        }
      }
    } else {
      // If no sizes found, just try to add the product as is
      if (await this.addToCartButton.isVisible({ timeout: 5000 })) {
        await this.addToCartButton.click();
        await this.page.waitForTimeout(2000);
      }
    }
  }
}
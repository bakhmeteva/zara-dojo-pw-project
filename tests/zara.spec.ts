import { test, expect } from '@playwright/test';
import { BasePage } from '../src/pages/BasePage.po';
import { SearchComponent } from '../src/pages/SearchComponent.po';
import { SearchResultPage } from '../src/pages/SearchResultPage.po';
import { ProductPage } from '../src/pages/ProductPage.po';
import { CartPage } from '../src/pages/CartPage.po';
import { RegistrationPage } from '../src/pages/RegistrationPage.po';


test.describe('Zara Website Tests', () => {

  test('Complete user journey: cookies, search, add to cart, registration', async ({ page }) => {
    const basePage = new BasePage(page);
    const searchComponent = new SearchComponent(page);
    const searchResultPage = new SearchResultPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const registrationPage = new RegistrationPage(page);

    await page.goto('/ua');
    await basePage.handleCookiesModal();

    await searchComponent.openSearch();
    await searchComponent.searchForProduct('dress');
    await searchResultPage.waitForResults();
    await searchResultPage.clickFirstAvailableProduct();
    await productPage.addAllSizesToCart();

    await cartPage.goToCart();
    await cartPage.proceedToCheckout();
    await registrationPage.testInvalidRegistration();
  });

  test('Search functionality test', async ({ page }) => {
    const basePage = new BasePage(page);
    const searchComponent = new SearchComponent(page);
    const searchResultPage = new SearchResultPage(page);

    await page.goto('/ua');
    await basePage.handleCookiesModal();

    await searchComponent.openSearch();
    await searchComponent.searchForProduct('jeans');
    await searchResultPage.waitForResults();

    const productCount = await searchResultPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });

  test('Add single product to cart test', async ({ page }) => {
    const basePage = new BasePage(page);
    const searchComponent = new SearchComponent(page);
    const searchResultPage = new SearchResultPage(page);
    const productPage = new ProductPage(page);

    await page.goto('/ua');
    await basePage.handleCookiesModal();

    await searchComponent.openSearch();
    await searchComponent.searchForProduct('shirt');
    await searchResultPage.waitForResults();
    await searchResultPage.clickFirstAvailableProduct();
    await productPage.addAllSizesToCart();
  });
});

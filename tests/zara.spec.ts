import { test } from '@playwright/test';
import { BasePage } from '../src/pages/BasePage.po';
import { SearchResultPage } from '../src/pages/SearchResultPage.po';

import { CartPage } from '../src/pages/CartPage.po';

import { SearchComponent } from '../src/pages/SearchComponent.po';
import { RegistrationPage } from '../src/pages/RegistrationPage.po';

test('Golden pass: Reject cookies, search product, manage cart, and register with validation', async ({ page }) => {
  const basePage = new BasePage(page);
  const searchComponent = new SearchComponent(page);
  const searchResultPage = new SearchResultPage(page);
  const cartPage = new CartPage(page);
  const registrationPage = new RegistrationPage(page);
  const productName = `FLORAL PRINT MIDI DRESS`;

  await page.goto('https://www.zara.com');
  await basePage.clickRejectCookies();
  await basePage.clickOnContinueButton();

  await searchComponent.searchProductByName(productName);
  await searchResultPage.selectDifferentSizes(productName, `S`, `M`, `L`, `XS`);

  await searchResultPage.clickOnShoppingBag();
  await cartPage.verifyCartItemsCount(4);
  await cartPage.deleteItemBySize(`M`, `S`);
  await cartPage.verifyCartItemsCount(2);
  await cartPage.clickToContinueButton();
  await registrationPage.clickRegisterButton();

  await registrationPage.registerWithInvalidData();
  await registrationPage.verifyRegistrationErrors(
    `E-mailEnter a valid email address (example: email@email.com).`,
    `PasswordEnter a secure password: At least 8 characters long, containing uppercase and lowercase letters and numbers.`,
    `NameRequired field.`,
    `NameRequired field.`,
  );

  await registrationPage.registerWithFakeData();
  await registrationPage.checkBotWarning();
});

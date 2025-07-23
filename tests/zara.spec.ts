import { test, expect } from '@playwright/test';
import { BasePage } from '../src/pages/BasePage.po';
import { SearchResultPage } from '../src/pages/SearchResultPage.po';
import { ProductPage } from '../src/pages/ProductPage.po';
import { CartPage } from '../src/pages/CartPage.po';
//import { RegistrationPage } from '../src/pages/RegistrationPage.po';
import { SearchComponent } from '../src/pages/SearchComponent.po';
import { RegistrationPage } from '../src/pages/RegistrationPage.po';


  test('Complete user journey: cookies, search, add to cart, registration', async ({ page }) => {
    const basePage = new BasePage(page);
    const searchComponent = new SearchComponent(page);
    const searchResultPage = new SearchResultPage(page);
    //const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const registrationPage = new RegistrationPage(page);

    await page.goto('https://www.zara.com');
    await basePage.clickRejectCookies();
    await basePage.clickOnContinueButton();

    await searchComponent.selectCategory('DRESSES');
    await searchResultPage.selectDifferentSizes(0, `S`, `M`, `L`, `XS`);

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

    //await registrationPage.verifyErrorIconVisible();

    await registrationPage.registerWithFakeData();
    await registrationPage.checkBotWarning();
    //await registrationPage.clickRegisterButton();
    //await registrationPage.clickAcceptPrivacyPolicy();
  });





import { test } from '../src/fixtures/fixtures';

test('Golden pass: Reject cookies, search product, manage cart, and register with validation',
  async ({
           page,
           basePage,
           searchComponent,
           searchResultPage,
           cartPage,
           registrationPage,
         }) => {
    const productName = `DRESS`;

    await test.step(`main page open`, async () => {
      await page.goto('');
      await basePage.clickRejectCookies();
      await basePage.clickOnContinueButton();
    });

    let sizes: string[] = [];
    await test.step(`add items to shopping bag`, async () => {
      await searchComponent.searchProductByName(productName);
      sizes = await searchResultPage.selectSizesOfAnyItemFromSearchResult(4);
    });

    await test.step(`shopping bag actions`, async () => {
      await searchResultPage.clickOnShoppingBag();
      await cartPage.verifyCartItemsCount(4);
      await cartPage.deleteItemBySize(sizes[1], sizes[3]);
      await cartPage.verifyCartItemsCount(2);
      await cartPage.clickToContinueButton();
    });

    await registrationPage.clickRegisterButton();

    await test.step(`negative registration checks`, async () => {
      await registrationPage.registerWithInvalidData();
      await registrationPage.verifyRegistrationErrors(
        `E-mailEnter a valid email address (example: email@email.com).`,
        `PasswordEnter a secure password: At least 8 characters long, containing uppercase and lowercase letters and numbers.`,
        `NameRequired field.`,
        `NameRequired field.`,
      );
    });

    await registrationPage.registerWithFakeData();
    await registrationPage.checkBotWarning();
  });

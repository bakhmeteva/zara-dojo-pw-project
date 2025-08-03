import { test} from '../src/fixtures/fixtures';

test('Golden pass: Reject cookies, search product, manage cart, and register with validation', async ({ 
  page, 
  basePage, 
  searchComponent, 
  searchResultPage, 
  cartPage, 
  registrationPage 
}) => {
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

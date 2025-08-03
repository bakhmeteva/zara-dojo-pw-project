import { test as base } from '@playwright/test';
import { BasePage } from '../pages/BasePage.po';
import { SearchComponent } from '../pages/SearchComponent.po';
import { SearchResultPage } from '../pages/SearchResultPage.po';
import { CartPage } from '../pages/CartPage.po';
import { RegistrationPage } from '../pages/RegistrationPage.po';

type PageObjects = {
  basePage: BasePage;
  searchComponent: SearchComponent;
  searchResultPage: SearchResultPage;
  cartPage: CartPage;
  registrationPage: RegistrationPage;
};

export const test = base.extend<PageObjects>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  searchComponent: async ({ page }, use) => {
    await use(new SearchComponent(page));
  },
  searchResultPage: async ({ page }, use) => {
    await use(new SearchResultPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
});

export { expect } from '@playwright/test'; 
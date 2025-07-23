import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class RegistrationPage {
  page: Page;
  emailInput: Locator;
  passwordInput: Locator;
  nameInput: Locator;
  surnameInput: Locator;
  privacyPolicy: Locator
  createAccountButton: Locator;
  error: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[data-qa-input-qualifier="email"]');
    this.passwordInput = page.locator('input[data-qa-input-qualifier="password"]');
    this.nameInput = page.locator('input[data-qa-input-qualifier="firstName"]');
    this.surnameInput = page.locator('input[data-qa-input-qualifier="lastName"]');
    this.privacyPolicy =page.locator(`xpath=.//span[contains(text(), 'I have read and understand')]/ancestor::div[@class='form-input']//span[contains(@class,'form-input-checkbox__label')]`)
    this.createAccountButton = page.locator('[data-qa-action="sign-up-submit"]');
    this.error = page.locator('.form-input-error');
  }

  async clickRegisterButton(): Promise<void> {
    await this.page.locator('[data-qa-id="logon-view-alternate-button"]').click();
  }

  async clickCreateAccountButton() {
    await this.page.locator('[data-qa-action="sign-up-submit"]').click();
  }



  async registerWithFakeData() {
    const name = faker.person.firstName();
    const surname = faker.person.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.nameInput.fill(name);
    await this.surnameInput.fill(surname);
    await this.surnameInput.press('Tab');
    //await this.privacyPolicy.click();
    await this.privacyPolicy.click();
    await this.createAccountButton.click();

    return { name, surname, email, password };
  }

  async registerWithInvalidData() {
    const invalidName = '';
    const invalidSurname = '';
    const invalidEmail = 'invalid-email';
    const invalidPassword = '123';

    await this.nameInput.fill(invalidName);
    await this.surnameInput.fill(invalidSurname);
    await this.emailInput.fill(invalidEmail);
    await this.passwordInput.fill(invalidPassword);
    await this.createAccountButton.click();


  }

  // async clickCreateAccountButton(): Promise<void> {
  //   await this.page.locator('[data-qa-action="sign-up-submit"]').click();
  // }

  async verifyRegistrationErrors(...errors: string[]): Promise<void> {
    const errorsFromPage = await this.error.all();
    for (const error of errors) {
      let isExist = false;
      for (const item of errorsFromPage) {
        const itemText = await item.textContent();
        // @ts-ignore
        if (itemText.trim() === error) {
          isExist = true;
          break;
        }
      }
      expect(isExist, `${error} exist`).toBe(true);
    }
  }

  // async clickAcceptPrivacyPolicy(): Promise<void> {
  //   await this.page.locator('[data-qa-id="zds-alert-dialog-accept-button"]').click();
  // }

  async checkBotWarning() {
    await this.page.locator('button[data-qa-id="close-modal"]').click();
  }
}

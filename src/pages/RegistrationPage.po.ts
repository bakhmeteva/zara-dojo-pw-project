import { Page, Locator, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { test } from '../fixtures/fixtures';

export class RegistrationPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly nameInput: Locator;
  readonly surnameInput: Locator;
  readonly privacyPolicy: Locator;
  readonly createAccountButton: Locator;
  readonly error: Locator;
  readonly registerButton: Locator;
  readonly closeModalButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[data-qa-input-qualifier="email"]');
    this.passwordInput = page.locator('input[data-qa-input-qualifier="password"]');
    this.nameInput = page.locator('input[data-qa-input-qualifier="firstName"]');
    this.surnameInput = page.locator('input[data-qa-input-qualifier="lastName"]');
    this.privacyPolicy = page.locator(`xpath=.//span[contains(text(), 'I have read and understand')]/ancestor::div[@class='form-input']//span[contains(@class,'form-input-checkbox__label')]`);
    this.createAccountButton = page.locator('[data-qa-action="sign-up-submit"]');
    this.error = page.locator('.form-input-error');
    this.registerButton = page.locator('[data-qa-id="logon-view-alternate-button"]');
    this.closeModalButton = page.locator('button[data-qa-id="close-modal"]');
  }

  async clickRegisterButton(): Promise<void> {
    await test.step(`clickRegisterButton`, async () => {
      await this.registerButton.click();
    });
  }

  async registerWithFakeData() {
    await test.step(`registration`, async () => {
      await expect(this.nameInput).toBeVisible({ timeout: 10000 });
      const name = faker.person.firstName();
      const surname = faker.person.lastName();
      const email = faker.internet.email();
      const password = faker.internet.password();

      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.nameInput.fill(name);
      await this.surnameInput.fill(surname);
      await this.surnameInput.press('Tab');
      await this.privacyPolicy.click();
      await this.createAccountButton.click();

      return { name, surname, email, password };
    });
  }

  async registerWithInvalidData() {
    await test.step(`registerWithInvalidData`, async () => {
      await expect(this.nameInput).toBeVisible({ timeout: 10000 });
      const invalidName = '';
      const invalidSurname = '';
      const invalidEmail = 'invalid-email';
      const invalidPassword = '123';

      await this.nameInput.fill(invalidName);
      await this.surnameInput.fill(invalidSurname);
      await this.emailInput.fill(invalidEmail);
      await this.passwordInput.fill(invalidPassword);
      await this.createAccountButton.click();
    });
  }

  async verifyRegistrationErrors(...errors: string[]): Promise<void> {
    await test.step(`verifyRegistrationErrors`, async () => {
      await expect(this.error.first()).toBeVisible({ timeout: 10000 });
      const errorsFromPage = await this.error.all();
      for (const error of errors) {
        let isExist = false;
        for (const item of errorsFromPage) {
          const itemText = await item.textContent();
          if (itemText && itemText.trim() === error) {
            isExist = true;
            break;
          }
        }
        expect(isExist, `${error} exist`).toBe(true);
      }
    });
  }

  async checkBotWarning() {
    await test.step(`checkBotWarning`, async () => {
      await this.closeModalButton.click();
    });
  }
}

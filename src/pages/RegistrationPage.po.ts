import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly registerButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessages: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerButton = page.locator('button:has-text("Register"), button:has-text("Sign up"), button:has-text("Create account"), a:has-text("Register"), .register-link, [data-testid="register"]');
    this.emailInput = page.locator('input[type="email"], input[name="email"], #email');
    this.passwordInput = page.locator('input[type="password"], input[name="password"], #password');
    this.firstNameInput = page.locator('input[name="firstName"], input[name="first_name"], #firstName');
    this.lastNameInput = page.locator('input[name="lastName"], input[name="last_name"], #lastName');
    this.submitButton = page.locator('button[type="submit"], button:has-text("Register"), button:has-text("Create"), .submit-button');
    this.errorMessages = page.locator('.error-message, .field-error, [data-testid="error"], .validation-error, .form-error');
  }

  async clickRegister() {
    if (await this.registerButton.isVisible({ timeout: 5000 })) {
      await this.registerButton.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async fillRegistrationForm(testData: {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
  }) {
    // Fill email
    if (await this.emailInput.isVisible({ timeout: 3000 })) {
      await this.emailInput.fill(testData.email);
    }

    // Fill password
    if (await this.passwordInput.isVisible({ timeout: 3000 })) {
      await this.passwordInput.fill(testData.password);
    }

    // Fill first name
    if (await this.firstNameInput.isVisible({ timeout: 3000 })) {
      await this.firstNameInput.fill(testData.firstName);
    }

    // Fill last name if exists
    if (testData.lastName && await this.lastNameInput.isVisible({ timeout: 3000 })) {
      await this.lastNameInput.fill(testData.lastName);
    }
  }

  async submitRegistration() {
    if (await this.submitButton.isVisible({ timeout: 3000 })) {
      await this.submitButton.click();
      await this.page.waitForTimeout(3000);
    }
  }

  async verifyValidationErrors(): Promise<boolean> {
    const errorCount = await this.errorMessages.count();

    if (errorCount > 0) {
      console.log(`Found ${errorCount} validation errors`);

      // Log error messages
      for (let i = 0; i < errorCount; i++) {
        const errorText = await this.errorMessages.nth(i).textContent();
        console.log(`Error ${i + 1}: ${errorText}`);
      }
      return true;
    }

    return false;
  }

  async testInvalidRegistration() {
    await this.clickRegister();

    const invalidData = {
      email: 'invalid-email',
      password: '123',
      firstName: '',
      lastName: '   '
    };

    await this.fillRegistrationForm(invalidData);
    await this.submitRegistration();

    const hasErrors = await this.verifyValidationErrors();
    expect(hasErrors).toBeTruthy();
  }
}
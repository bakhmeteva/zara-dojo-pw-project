import { Page, Locator } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class RegistrationPage {
  page: Page;
  usernameInput: Locator
  emailInput: Locator;
  passwordInput: Locator;
  signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole("textbox", { name: "Username" })
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.signUpButton = page.getByRole("button", { name: "Sign up" });
  }

  async clickRegisterButton(): Promise<void> {
    await this.page.locator('[data-qa-id="logon-view-alternate-button"]').click();
  }

  async loginWithFakeData() {
    const username = faker.person.firstName()
    const email = faker.internet.email();
    const password = faker.internet.password();

    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signUpButton.click();

    return { email, password };
  }
}

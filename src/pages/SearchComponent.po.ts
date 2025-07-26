import { Page, Locator } from '@playwright/test';
import { th } from '@faker-js/faker';

export class SearchComponent {
  readonly page: Page;
  readonly searchIcon: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchSuggestions: Locator;
  readonly menuButton: Locator;
  readonly closeMenu: Locator;
  readonly filterBtn: Locator;
  readonly filterField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchIcon = page.locator('[data-testid="search-icon"], .search-icon, [aria-label*="search" i]');
    this.searchInput = page.locator('input[type="search"], input[placeholder*="search" i], #search-input');
    this.searchButton = page.locator('button[type="submit"], .search-button, [aria-label*="search" i]');
    this.searchSuggestions = page.locator('.search-suggestions, .autocomplete-suggestions');
    this.menuButton = page.locator('button[data-qa-id="layout-header-toggle-menu"]');
    this.closeMenu = page.locator('button[data-qa-id="layout-header-close"]');
    this.filterBtn = page.locator('[data-qa-id="header-search-text-link"]');
    this.filterField = page.locator('#search-home-form-combo-input');
  }

  async openSearch() {
    await this.searchIcon.click();
  }

  async searchForProduct(searchTerm: string) {
    await this.searchInput.waitFor({ state: 'visible' });
    await this.searchInput.fill(searchTerm);
    await this.searchInput.press('Enter');
  }

  async selectSuggestion(suggestionText: string) {
    await this.searchSuggestions.locator(`text=${suggestionText}`).click();
  }

  async selectCategory(categoryName: string) {
    await this.openMenu();
    await this.clickCategory(categoryName);
  }
  async openMenu () {
    await this.menuButton.click();
  }

  async clickCategory(categoryName: string) {
    await this.page.locator('a[data-qa-action="unfold-category"]', { hasText: categoryName }).click();
  }

  async searchProductByName(productName: string) {
    await this.filterBtn.click();
    await this.filterField.fill(productName);
    await this.filterField.press(`Enter`)
  }
}
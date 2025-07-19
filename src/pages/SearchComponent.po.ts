import { Page, Locator } from '@playwright/test';

export class SearchComponent {
  readonly page: Page;
  readonly searchIcon: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchSuggestions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchIcon = page.locator('[data-testid="search-icon"], .search-icon, [aria-label*="search" i]');
    this.searchInput = page.locator('input[type="search"], input[placeholder*="search" i], #search-input');
    this.searchButton = page.locator('button[type="submit"], .search-button, [aria-label*="search" i]');
    this.searchSuggestions = page.locator('.search-suggestions, .autocomplete-suggestions');
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
}
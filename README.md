# Playwright E2E Testing Project

Цей проєкт призначений для автоматизованого тестування веб-додатків за допомогою [Playwright](https://playwright.dev/) і TypeScript.

## Структура проєкту

```
├── src/pages/           # Page Object моделі та локатори
├── tests/               # E2E тести
├── playwright.config.ts # Конфігурація Playwright
├── tsconfig.json        # Конфігурація TypeScript
├── package.json         # Залежності та npm-скрипти
├── playwright-report/   # Автоматично згенеровані звіти
├── test-results/        # Результати запуску тестів
├── .github/workflows/   # CI/CD workflow для GitHub Actions
```

## Швидкий старт

1. **Встановлення залежностей:**

   ```bash
   npm install
   ```

2. **Запуск тестів локально:**

   ```bash
   npx playwright test
   ```

3. **Перегляд звіту:**

   Після виконання тестів:
   ```bash
   npx playwright show-report
   ```

## Автоматичний запуск тестів (CI)

У проєкті налаштовано автоматичний запуск тестів у GitHub Actions. Workflow знаходиться у `.github/workflows/playwright.yml` і виконується при кожному push або pull request до гілки `main` .

**Що відбувається у CI:**
- Встановлюються залежності та браузери Playwright
- Запускаються всі тести
- Зберігаються артефакти: звіти та результати тестів

## Рекомендації

- Для додавання нових тестів використовуйте папку `tests/`.
- Для багаторазового використання кроків і локаторів створюйте Page Object моделі у `src/pages/`.
- Не забудьте додати тимчасові файли та артефакти тестів до `.gitignore`.
- Для підвищення якості коду рекомендується використовувати ESLint і Prettier.

## Корисні посилання
- [Документація Playwright](https://playwright.dev/docs/intro)
- [Документація TypeScript](https://www.typescriptlang.org/docs/)

---

Якщо виникнуть питання або потрібна допомога з налаштуванням, звертайтеся до авторів проєкту або створіть issue. 
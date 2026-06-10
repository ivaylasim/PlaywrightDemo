import { Page, Locator, expect } from '@playwright/test';

export class PartnyorstvaPage {
  // Playwright обектът за управление на браузъра
  readonly page: Page;
  // URL на страницата — на едно място, лесно за промяна
  readonly url = 'https://www.shu.bg/international/partners';

  // -- Декларации на локаторите — посочва кои елементи от страницата ще се ползват в тестовете
  readonly table: Locator;
  readonly headerCells: Locator;

  // Дефиниране на Конструктор и инициализация на page и локаторите
  constructor(page: Page) {
    this.page = page;
    this.table = page.getByRole('table').filter({ hasText: 'наименование на чуждестранната институция' });
    // Първият ред на таблицата е хедърният; вземаме клетките вътре в него
    this.headerCells = this.table.getByRole('row').first().getByRole('cell');
  }

  // --- Методи за действие (Page Actions) ---
  // Зарежда страницата в браузъра
  async open() {
    await this.page.goto(this.url);
  }

  // --- Методи за проверка (Assertions) ---
  // Проверява дали таблицата с партньорските институции се вижда на страницата
  async expectTableVisible() {
    await expect(this.table).toBeVisible();
  }

  // Проверява дали хедърният ред съдържа шестте колони в очаквания ред:
  // № | наименование (БГ) | оригинално наименование | град | държава | сайт
  async expectHeaders() {
    await expect(this.headerCells).toContainText([
      '№',
      'наименование на чуждестранната институция на БГ',
      'Оригинално наименование на институцията',
      'град',
      'държава',
      'сайт',
    ]);
  }

  // Намира реда на партньор по име и проверява град, държава и href на линка
  async expectPartner(name: string, city: string, country: string, href: string) {
 
    // Котва по съдържание: редът, който съдържа името на институцията
    const row = this.table.getByRole('row').filter({ hasText: name });
 
    // Проверка, че редът съдържа очаквания град и държава
    await expect(row).toContainText(city);
    await expect(row).toContainText(country);
 
    // Линкът вътре в реда сочи правилния адрес (без да го посещаваме)
    await expect(row.getByRole('link')).toHaveAttribute('href', href);
  }

}
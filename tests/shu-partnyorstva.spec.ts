// Импорт на test и expect от Playwright
import { test, expect } from '@playwright/test';

// Импорт на Page обекта - .. означава "излез от tests и влез в pages"
import { PartnyorstvaPage } from '../pages/PartnyorstvaPage';

// Споделена инстанция на страницата - инициализира се преди всеки тест
let partnyorstvaPage: PartnyorstvaPage;

test.beforeEach(async ({ page }) => {
  // Създаване на обект от класа PartnyorstvaPage и отваряне на страницата преди всеки тест
  partnyorstvaPage = new PartnyorstvaPage(page);
  await partnyorstvaPage.open();
});

test.describe('Таблица с партньори', () => {
  // Тест 1: Проверява дали таблицата с партньорските институции се вижда на страницата
  test('таблицата е видима', async () => {
    await partnyorstvaPage.expectTableVisible();
  });

    // Тест 2: Проверява дали хедърният ред съдържа шестте колони в очаквания ред: № | наименование (БГ) | оригинално наименование | град | държава | сайт
  test('хедърът съдържа правилните колони', async () => {
    await partnyorstvaPage.expectHeaders();
  });

  // Тест 3, 4 и 5: Проверяват редовете на конкретни партньори - град, държава и линк
    test.describe('Записи на партньори', () => {
  // Тест 3: Проверява реда на Университета в Дебрецен - град, държава и линк
  test('Университета в Дебрецен - данни и линк', async () => {
    await partnyorstvaPage.expectPartner(
      'Университета в Дебрецен',
      'Дебрецен',
      'Унгария',
      'https://unideb.hu/en'
    );
  });

  // Тест 4: Проверява реда на Университет в Риека - град, държава и линк
  test('Университет в Риека - данни и линк', async () => {
    await partnyorstvaPage.expectPartner(
      'Университет в Риека',
      'Риека',
      'Хърватия',
      'https://uniri.hr/en/home/'
    );
  });

  // Тест 5: Проверява реда на Национален университет за изкуства - град, държава и линк
  test('Национален университет за изкуства - данни и линк', async () => {
    await partnyorstvaPage.expectPartner(
      'Национален университет за изкуства',
      'Букурещ',
      'Румъния',
      'https://unarte.org/'
    );
  });

});


});
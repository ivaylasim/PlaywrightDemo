// Импорт на test и expect от Playwright
import { test, expect } from '@playwright/test';

// Импорт на Page обекта — .. означава "излез от tests и влез в pages"
import { RazpisiGraficiPage } from '../pages/RazpisiGraficiPage';

// Споделена инстанция на страницата — инициализира се преди всеки тест
let razpisiPage: RazpisiGraficiPage;
test.beforeEach(async ({ page }) => {
    // Създаване на обект от класа RazpisiGraficiPage и отваряне на страницата преди всеки тест
    razpisiPage = new RazpisiGraficiPage(page);
    await razpisiPage.open();
});

test.describe('Page names', () => {
// Тест 1: Проверява дали заглавието на таба съдържа "Разписи и графици"
test('title contains expected text', async ({ page }) => {
     // Проверка дали title съдържа "Разписи и графици"
    await expect(page).toHaveTitle(/Разписи и графици/);
});

// Тест 2: Проверява дали heading (h1) заглавието "Разписи и графици" се вижда на страницата
test('check for specific text', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Разписи и графици' })).toBeVisible();
});

// Тест 3: Проверява дали заглавието "Учебни разписи" се вижда на страницата
test('check for heading "Учебни разписи"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Учебни разписи' })).toBeVisible();
});

// Тест 4: Проверява дали заглавието "Изпитни графици" се вижда на страницата
test('check for heading "Изпитни графици"', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Изпитни графици' })).toBeVisible();
});
});

test.describe('Links', () => {
// Тест 5: Проверява линковете за Квалификационна характеристика, Комплект на студента, Конспект за държавен изпит и График за държавен изпит
test('check for specific links', async ({ page }) => {
    // Проверка дали линк "Квалификационна характеристика" е видим и има правилен URL
    await expect(razpisiPage.pdfKvalifikaciya).toBeVisible();
    await expect(razpisiPage.pdfKvalifikaciya).toHaveAttribute('href', 'https://www.shu.bg/wp-content/uploads/studentski-ekomplekt/kvalifikaciya/158-kvalifikaciya.pdf?=1458597600.pdf');
    
    // Проверка дали линк "Конспект за държавен изпит" е видим и има правилен URL
    await expect(razpisiPage.pdfKonspectDurzavenIzpit).toBeVisible();
    await expect(razpisiPage.pdfKonspectDurzavenIzpit).toHaveAttribute('href', 'https://www.shu.bg/wp-content/uploads/studentski-ekomplekt/dyrjaven-izpit/158-dyrjaven-izpit.pdf?=1688644209.pdf');
    
    // Проверка дали линк "График за държавен изпит" е видим и има правилен URL
    await expect(razpisiPage.pdfGrafikDurzavenIzpit).toBeVisible();
    await expect(razpisiPage.pdfGrafikDurzavenIzpit).toHaveAttribute('href', 'https://www.shu.bg/wp-content/uploads/studentski-ekomplekt/grafik-di/158-grafik-di.pdf?=1752053067.pdf');   
    
    // Проверка дали линк "Комплект на студента" е видим и има правилен URL
    await expect(razpisiPage.rarStudentskiKomplekt).toBeVisible();
    await expect(razpisiPage.rarStudentskiKomplekt).toHaveAttribute('href', 'https://www.shu.bg/wp-content/uploads/studentski-ekomplekt/info-pak/158-info-pak.rar?=1555275600.rar');
});
});

test.describe('Main functionality', () => {
// Тест 6: Избира факултет, степен и форма, натиска Търси и проверява резултат
test('check for specific link in list', async ({ page }) => {
    // Избиране на Факултет по математика и информатика (стойност '3')
    await razpisiPage.selectFaculty('3');
    // Избиране на Бакалавър (стойност '5')
    await razpisiPage.selectDegree('5');
    // Избиране на Редовна форма (стойност '1')
    await razpisiPage.selectForm('1');
    // Натискане на бутона Търси
    await razpisiPage.submit();
    // Проверка дали специалността се появява в резултатите
    await expect(page.getByRole('link', { name: 'Софтуерно инженерство' })).toBeVisible();
});

// Тест 7: Проверява за правилния текст, ако не са избрани критерии
test('check for default text when no criteria selected', async ({ page }) => {
    await razpisiPage.submit();
    // Проверка дали се показва правилният текст по подразбиране
    await expect(page.getByText('Няма специалности по избраните критерии!')).toBeVisible();
});
});


test.describe('Left navigation', () => {
// Тест 8: Проверява дали линкът "Разписи и графици" е видим и активен (aria-current="page")
test('check if "Разписи и графици" link is visible and active', async ({ page }) => {
    await expect(razpisiPage.linkRazpisi).toBeVisible();
    await expect(razpisiPage.linkRazpisi).toHaveAttribute('aria-current', 'page');  
});

// Тест 9: Проверява дали линкът "Персонална студентска информация" е видим и НЕактивен (aria-current="page")
test('check if "Разписи и графици" link is visible and NOT active', async ({ page }) => {
    await expect(razpisiPage.linkStudents).toBeVisible();
    await expect(razpisiPage.linkStudents).not.toHaveAttribute('aria-current', 'page');  
}); 
});
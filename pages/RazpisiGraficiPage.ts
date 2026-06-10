import { Page, Locator } from '@playwright/test';

export class RazpisiGraficiPage {
  // Playwright обектът за управление на браузъра
  readonly page: Page;
   // URL на страницата — на едно място, лесно за промяна
  readonly url = 'https://www.shu.bg/students/razpisi-i-grafici/?speciality=158';
  
  // -- Декларации на локаторите — посочва кои елементи от страницата ще се ползват в тестовете
  readonly facultySelect: Locator;
  readonly degreeSelect: Locator;
  readonly formSelect: Locator;
  readonly submitButton: Locator;
  readonly pdfKvalifikaciya: Locator;
  readonly pdfKonspectDurzavenIzpit: Locator;
  readonly pdfGrafikDurzavenIzpit: Locator;
  readonly rarStudentskiKomplekt: Locator;
  readonly linkRazpisi: Locator;
  readonly linkStudents: Locator;

  // Дефиниране на Конструктор и инициализация на page и локаторите
  constructor(page: Page) {
    this.page = page;
    this.facultySelect = this.page.locator('select[name="faculty"]');
    this.degreeSelect = this.page.locator('select[name="degree"]');
    this.formSelect = this.page.locator('select[name="form"]');
    this.submitButton = this.page.locator('[name="submitform"]');
    this.pdfKvalifikaciya = this.page.getByRole('link', {name: 'Квалификационна характеристика'});
    this.pdfKonspectDurzavenIzpit = this.page.getByRole('link', {name: 'Конспект за държавен изпит'});
    this.pdfGrafikDurzavenIzpit = this.page.getByRole('link', {name: 'График за държавен изпит'});
    this.rarStudentskiKomplekt = this.page.getByRole('link', {name: 'Комплект на студента'});
    this.linkRazpisi = this.page.locator('a[aria-current="page"]').nth(1);
    this.linkStudents = this.page.getByRole('link', {name: 'Персонална студентска информация'});
  }


 // --- Методи за действие (Page Actions) ---

  // Зарежда страницата в браузъра
  async open() {
    await this.page.goto(this.url);
  }

  // Избира факултет от падащото меню по неговата стойност (value)
  async selectFaculty(value: string) {
    await this.facultySelect.selectOption(value);
  }

  // Избира образователно-квалификационна степен (напр. Бакалавър, Магистър)
  async selectDegree(value: string) {
    await this.degreeSelect.selectOption(value);
  }

  // Избира форма на обучение (напр. Редовна, Задочна)
  async selectForm(value: string) {
    await this.formSelect.selectOption(value);
  }

  // Потвърждава избора и изпраща формата чрез бутона "Търси"
  async submit() {
    await this.submitButton.click();
  }
}
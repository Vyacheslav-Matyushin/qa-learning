import { test, expect } from '@playwright/test';

test('Успешная авторизация в интернет-магазине', async ({ page }) => {
  // 1. Открываем сайт (ждем полную загрузку страницы)
  await page.goto('https://saucedemo.com');

  // 2. Вводим логин в поле. Находим его по атрибуту id
  await page.locator('#user-name').fill('standard_user');

  // 3. Вводим пароль
  await page.locator('#password').fill('secret_sauce');

  // 4. Кликаем по кнопке войти
  await page.locator('#login-button').click();

  // 5. Проверка (Assertion): убеждаемся, что мы попали внутрь магазина.
  // Проверим, что на новой странице появился заголовок "Products" (Товары).
  const title = page.locator('.title');
  await expect(title).toHaveText('Products');
});

test('Негативный тест: Ошибка при вводе неверного пароля', async ({ page }) => {
  // 1. Открываем сайт
  await page.goto('https://saucedemo.com');

  // 2. Вводим правильный логин
  await page.locator('#user-name').fill('standard_user');

  // 3. Вводим НЕВЕРНЫЙ пароль (робот напишет туда случайный текст)
  await page.locator('#password').fill('wrong_password_123');

  // 4. Кликаем по кнопке войти
  await page.locator('#login-button').click();

  // 5. Проверка (Assertion): проверяем, что на экране всплыла ошибка.
  // Находим контейнер ошибки по атрибуту data-test
  const errorContainer = page.locator('[data-test="error"]');
  
  // Проверяем, что в тексте ошибки написано ровно то, что ожидает пользователь
  // Замените старую строку ожидания на эту:
await expect(errorContainer).toHaveText('Epic sadface: Username and password do not match any user in this service');

});

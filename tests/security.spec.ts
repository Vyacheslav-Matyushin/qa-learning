import { test, expect } from '@playwright/test';

test('Проверка безопасности: Устойчивость формы к XSS-инъекциям', async ({ page }) => {
  // 1. Открываем главную страницу сайта
  await page.goto('https://saucedemo.com');

  // 2. Создаем вредоносный JS-скрипт (Payload), который хакеры используют для кражи данных
  const xssPayload = "<script>alert('Сайт взломан!');</script>";

  // 3. Робот вводит этот опасный код в поле логина вместо обычного имени пользователя
  await page.locator('#user-name').fill(xssPayload);

  // 4. Вводим любой пароль и пытаемся нажать "Войти"
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  // 5. Проверка безопасности (Assertion):
  // Находим контейнер ошибки, который показывает сайт
  const errorContainer = page.locator('[data-test="error"]');

  // Убеждаемся, что сайт вывел безопасный текст ошибки, а не выполнил наш скрипт.
  // Сайт должен сказать, что пользователя с ТАКИМ ИМЕНЕМ (нашим скриптом) просто не существует.
  await expect(errorContainer).toContainText('Username and password do not match any user in this service');

  // 6. Дополнительная супер-проверка: убеждаемся, что значение в поле ввода 
  // осталось обычной безопасной строкой текста
  const inputFieldValue = await page.locator('#user-name').inputValue();
  expect(inputFieldValue).toBe(xssPayload);
});

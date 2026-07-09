import { test, expect } from '@playwright/test';

test('Автотест: Создание поста через API (POST)', async ({ request }) => {
  // Отправляем POST-запрос на ПРАВИЛЬНЫЙ длинный учебный сервер
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'Автотест Playwright',
      body: 'Проверка отправки API-запроса из кода',
      userId: 1,
    }
  });

  // Проверяем статус ответа (201 Created)
  expect(response.status()).toBe(201);

  // Читаем текстовый ответ от сервера
  const responseBody = await response.json();

  // Проверяем, что сервер вернул ID созданного поста (101)
  expect(responseBody.id).toBe(101);
  
  console.log('Ответ сервера:', responseBody);
});

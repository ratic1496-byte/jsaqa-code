import { test, expect } from '@playwright/test';
import { email, password } from '../user.js';

test('Успешная авторизация', async ({ page }) => {
  // 1. Открываем форму входа
  await page.goto('https://netology.ru/?modal=sign_in', { waitUntil: 'domcontentloaded' });

  // 2. Если есть баннер Cookies, закрываем его
  const cookieOk = page.locator('button:has-text("OK")');
  if (await cookieOk.isVisible().catch(() => false)) {
    await cookieOk.click();
  }

  // 3. Раскрываем блок "Другие способы входа"
  const otherWays = page.locator('text=Другие способы входа');
  if (await otherWays.isVisible().catch(() => false)) {
    await otherWays.click();
  }

  // 4. Кликаем "Войти по почте"
  const emailLoginBtn = page.locator('text=Войти по почте');
  await emailLoginBtn.click();

  // 5. Заполняем поля почты и пароля
  await page.locator('input[type="email"]').fill(email);
  await page.locator('input[type="password"]').fill(password);

  // 6. Нажимаем кнопку Войти
  await page.locator('button:has-text("Войти")').click();

  // 7. Проверяем успешный вход по изменению URL (адрес должен содержать /profile)
  await expect(page).toHaveURL(/.*profile/, { timeout: 30000 });
});

test('Неуспешная авторизация с неверными данными', async ({ page }) => {
  // 1. Открываем форму входа
  await page.goto('https://netology.ru/?modal=sign_in', { waitUntil: 'domcontentloaded' });

  // 2. Раскрываем блок "Другие способы входа"
  const otherWays = page.locator('text=Другие способы входа');
  if (await otherWays.isVisible().catch(() => false)) {
    await otherWays.click();
  }

  // 3. Кликаем "Войти по почте"
  const emailLoginBtn = page.locator('text=Войти по почте');
  await emailLoginBtn.click();

  // 4. Заполняем неверные данные
  await page.locator('input[type="email"]').fill('wrong_student_12345@test.ru');
  await page.locator('input[type="password"]').fill('WrongPassword123');

  // 5. Нажимаем кнопку Войти
  await page.locator('button:has-text("Войти")').click();

  // 6. Проверяем появление текста ошибки (исправили селектор!)
  const errorHint = page.locator('[data-testid="login-error-hint"]');
  await expect(errorHint).toBeVisible({ timeout: 15000 });
  await expect(errorHint).toContainText('Вы ввели неправильно логин или пароль.');
}); 



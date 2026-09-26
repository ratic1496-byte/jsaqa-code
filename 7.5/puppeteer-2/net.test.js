const { selectDay, selectSeat, bookTickets } = require("./lib/commands.js");

describe("Booking movie tickets tests", () => {
  beforeEach(async () => {
    // 1. Притворяемся обычным браузером Windows Chrome
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // 2. Открываем строго через HTTPS и ждём только загрузку DOM
    await page.goto("https://qamid.tmweb.ru/client/index.php", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
  }, 60000);

  // 1. Успешное бронирование 1 билета (Happy Path 1)
  test("Should successfully book 1 ticket", async () => {
    await selectDay(page, 2);
    await page.waitForSelector(".movie-seances__time");
    await page.click(".movie-seances__time");
    await selectSeat(page, 1, 3);
    await bookTickets(page);

    await page.waitForSelector(".ticket__check-title");
    const actualText = await page.$eval(".ticket__check-title", (el) => el.textContent);
    expect(actualText).toContain("Вы выбрали билеты:");
  }, 60000);

  // 2. Успешное бронирование 2 билетов (Happy Path 2)
  test("Should successfully book 2 tickets", async () => {
    await selectDay(page, 2);
    await page.waitForSelector(".movie-seances__time");
    await page.click(".movie-seances__time");
    await selectSeat(page, 1, 4);
    await selectSeat(page, 1, 5);
    await bookTickets(page);

    await page.waitForSelector(".ticket__check-title");
    const actualText = await page.$eval(".ticket__check-title", (el) => el.textContent);
    expect(actualText).toContain("Вы выбрали билеты:");
  }, 60000);

  // 3. Попытка забронировать уже занятое место (Sad Path)
  test("Should not allow to book taken seat", async () => {
    await selectDay(page, 2);
    await page.waitForSelector(".movie-seances__time");
    await page.click(".movie-seances__time");

    await page.waitForSelector(".buying-scheme__chair_taken");
    await page.click(".buying-scheme__chair_taken");

    const isButtonDisabled = await page.$eval(".acceptin-button", (el) => el.disabled);
    expect(isButtonDisabled).toBe(true);
  }, 60000);
});

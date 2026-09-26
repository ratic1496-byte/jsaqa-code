module.exports = {
  // Выбор дня недели
  selectDay: async function (page, dayIndex = 2) {
    await page.waitForSelector(`.page-nav__day:nth-child(${dayIndex})`);
    await page.click(`.page-nav__day:nth-child(${dayIndex})`);
  },

  // Выбор свободного кресла
  selectSeat: async function (page, row = 1, seat = 1) {
    const seatSelector = `.buying-scheme__row:nth-child(${row}) .buying-scheme__chair:nth-child(${seat}):not(.buying-scheme__chair_taken)`;
    await page.waitForSelector(seatSelector);
    await page.click(seatSelector);
  },

  // Нажатие кнопки забронировать
  bookTickets: async function (page) {
    const buttonSelector = ".acceptin-button";
    await page.waitForSelector(buttonSelector);
    await page.click(buttonSelector);
  }
};

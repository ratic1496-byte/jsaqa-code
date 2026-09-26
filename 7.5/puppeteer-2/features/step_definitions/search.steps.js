const puppeteer = require("puppeteer");
const { Given, When, Then, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { expect } = require("chai");
const { selectDay, selectSeat, bookTickets } = require("../../lib/commands.js");

setDefaultTimeout(60000);

let browser;
let page;

Before(async function () {
  browser = await puppeteer.launch({ 
    headless: false,
    slowMo: 100,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );
});

After(async function () {
  if (browser) {
    await browser.close();
  }
});

Given("user is on cinema home page {string}", async function (url) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
});

When("user selects day {int} and seance time", async function (day) {
  await selectDay(page, day);
  await page.waitForSelector(".movie-seances__time");
  await page.click(".movie-seances__time");
});

When("user selects seat in row {int} and chair {int}", async function (row, seat) {
  await selectSeat(page, row, seat);
});

When("user clicks book tickets button", async function () {
  await bookTickets(page);
});

Then("user sees ticket confirmation with text {string}", async function (expectedText) {
  await page.waitForSelector(".ticket__check-title");
  const actualText = await page.$eval(".ticket__check-title", (el) => el.textContent);
  expect(actualText).to.include(expectedText);
});

When("user clicks on taken seat", async function () {
  await page.waitForSelector(".buying-scheme__chair_taken");
  await page.click(".buying-scheme__chair_taken");
});

Then("booking button should be disabled", async function () {
  const isButtonDisabled = await page.$eval(".acceptin-button", (el) => el.disabled);
  expect(isButtonDisabled).to.be.true;
});

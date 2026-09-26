let page;

// Блок 1. Тесты для страницы GitHub Team
describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  }, 60000);

  afterEach(() => {
    page.close();
  });

  test(
    "The h1 header content",
    async () => {
      const firstLink = await page.$("header div div a");
      await firstLink.click();
      await page.waitForSelector("h1");
      const title2 = await page.title();
      expect(title2).toContain("GitHub");
    },
    60000
  );

  test(
    "The first link attribute",
    async () => {
      const actual = await page.$eval("a", (link) =>
        link.getAttribute("href")
      );
      expect(actual).toEqual("#start-of-content");
    },
    60000
  );

  test(
    "The page contains Sign in button",
    async () => {
      const btnSelector = ".btn-large-mktg.btn-mktg, a[href*='signup']";
      await page.waitForSelector(btnSelector, {
        visible: true,
      });
      const actual = await page.$eval(btnSelector, (link) => link.textContent);
      expect(actual.toLowerCase()).toMatch(/sign|team|start|get/i);
    },
    60000
  );
});

// Блок 2. Новые 3 теста для других страниц GitHub
describe("Other GitHub pages tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
  }, 60000);

  afterEach(() => {
    page.close();
  });

  test(
    "Enterprise page title check",
    async () => {
      await page.goto("https://github.com/enterprise");
      await page.waitForSelector("h1");
      const title = await page.title();
      expect(title).toContain("Enterprise");
    },
    60000
  );

  test(
    "Pricing page title check",
    async () => {
      await page.goto("https://github.com/pricing");
      await page.waitForSelector("h1");
      const title = await page.title();
      expect(title).toContain("Pricing");
    },
    60000
  );

  test(
    "Features page title check",
    async () => {
      await page.goto("https://github.com/features");
      await page.waitForSelector("h1");
      const title = await page.title();
      expect(title).toContain("Features");
    },
    60000
  );
});

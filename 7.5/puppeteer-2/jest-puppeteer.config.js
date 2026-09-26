module.exports = {
  launch: {
    headless: false,
    slowMo: 100,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage"
    ]
  }
};

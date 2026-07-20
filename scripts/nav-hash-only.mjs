import { chromium } from "playwright";

const url = process.argv[2] || "http://127.0.0.1:3000/";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1536, height: 900 } });
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);
console.log("hydrated", await page.evaluate(() => window.__NAV_HYDRATED === true));
await page.locator('header a[href="#story"]').click();
await page.waitForTimeout(800);
console.log(
  "afterStory",
  await page.evaluate(() => ({
    y: window.scrollY,
    hash: location.hash,
    storyTop: document.getElementById("story")?.getBoundingClientRect().top,
  })),
);
await browser.close();

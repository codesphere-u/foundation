import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1536, height: 900 } });
page.on("pageerror", (e) => console.log("PAGEERROR", e.message));
page.on("console", (m) => {
  if (m.type() === "error") console.log("CONSOLE_ERR", m.text());
});

await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);

const before = await page.evaluate(() => ({
  y: window.scrollY,
  htmlOx: getComputedStyle(document.documentElement).overflowX,
  bodyOx: getComputedStyle(document.body).overflowX,
  mainOx: getComputedStyle(document.getElementById("main")).overflowX,
  storyExists: !!document.getElementById("story"),
  navLinkCount: document.querySelectorAll('header a[href="#story"]').length,
}));
console.log("BEFORE", JSON.stringify(before));

await page.locator('header a[href="#story"]').click();
await page.waitForTimeout(1000);

const after = await page.evaluate(() => ({
  y: window.scrollY,
  hash: location.hash,
  storyTop: document.getElementById("story")?.getBoundingClientRect().top,
}));
console.log("AFTER_CLICK", JSON.stringify(after));

await page.evaluate(() => document.getElementById("story")?.scrollIntoView({ behavior: "instant" }));
await page.waitForTimeout(300);
const afterManual = await page.evaluate(() => ({
  y: window.scrollY,
  storyTop: document.getElementById("story")?.getBoundingClientRect().top,
}));
console.log("AFTER_MANUAL", JSON.stringify(afterManual));

// Test without overflow-x clip
await page.evaluate(() => {
  document.documentElement.style.overflowX = "visible";
  document.body.style.overflowX = "visible";
  const main = document.getElementById("main");
  if (main) main.style.overflowX = "visible";
  window.scrollTo(0, 0);
  location.hash = "";
});
await page.waitForTimeout(200);
await page.evaluate(() => {
  location.hash = "#story";
});
await page.waitForTimeout(800);
const afterFix = await page.evaluate(() => ({
  y: window.scrollY,
  hash: location.hash,
  storyTop: document.getElementById("story")?.getBoundingClientRect().top,
}));
console.log("AFTER_NO_CLIP_HASH", JSON.stringify(afterFix));

await browser.close();

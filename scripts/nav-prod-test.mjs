import { chromium } from "playwright";

const url = process.argv[2] || "http://127.0.0.1:3001/";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
});
page.on("pageerror", (e) => console.log("PAGEERROR", e.message));
page.on("console", (m) => {
  if (m.type() === "error") console.log("ERR", m.text().slice(0, 250));
});

await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
for (let i = 0; i < 8; i++) {
  const h = await page.evaluate(() => window.__NAV_HYDRATED === true);
  console.log("tick", i, "hydrated", h);
  if (h) break;
  await page.waitForTimeout(400);
}

await page.locator('button[aria-controls="mobile-nav"]').click();
await page.waitForTimeout(400);
const open = await page.evaluate(() => ({
  hydrated: window.__NAV_HYDRATED === true,
  expanded: document
    .querySelector('button[aria-controls="mobile-nav"]')
    .getAttribute("aria-expanded"),
  panelVis: getComputedStyle(document.getElementById("mobile-nav")).visibility,
  panelPE: getComputedStyle(document.getElementById("mobile-nav")).pointerEvents,
}));
console.log("AFTER_HAMBURGER", JSON.stringify(open));

if (open.expanded === "true") {
  await page.locator('#mobile-nav a[href="#story"]').click();
  await page.waitForTimeout(800);
  console.log(
    "AFTER_STORY",
    await page.evaluate(() => ({ y: window.scrollY, hash: location.hash })),
  );
}

await browser.close();

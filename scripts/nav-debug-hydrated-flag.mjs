import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
page.on("pageerror", (e) => console.log("PAGEERROR", e.message));
page.on("console", (m) => {
  if (m.type() === "error") console.log("ERR", m.text().slice(0, 300));
});

await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle", timeout: 60000 });
// wait for possible late hydration
for (let i = 0; i < 10; i++) {
  const h = await page.evaluate(() => window.__NAV_HYDRATED === true);
  console.log("tick", i, "hydrated", h);
  if (h) break;
  await page.waitForTimeout(500);
}

const final = await page.evaluate(() => ({
  navHydrated: window.__NAV_HYDRATED === true,
  expanded: document
    .querySelector('button[aria-controls="mobile-nav"]')
    ?.getAttribute("aria-expanded"),
}));
console.log("FINAL", final);

// Test donation client interactivity
await page.locator("#donate button", { hasText: "UGX 10,000" }).first().click();
await page.waitForTimeout(300);
const donateState = await page.evaluate(() => {
  const buttons = [...document.querySelectorAll("#donate button")];
  return buttons.slice(0, 4).map((b) => ({
    text: b.textContent?.trim().slice(0, 20),
    cls: b.className.slice(0, 80),
  }));
});
console.log("DONATE_BTNS", JSON.stringify(donateState, null, 2));

await browser.close();

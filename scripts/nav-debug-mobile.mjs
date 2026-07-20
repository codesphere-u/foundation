import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
});
page.on("pageerror", (e) => console.log("PAGEERROR", e.message));

await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);

const state = await page.evaluate(() => {
  const btn = document.querySelector('button[aria-controls="mobile-nav"]');
  const panel = document.getElementById("mobile-nav");
  const cs = panel ? getComputedStyle(panel) : null;
  const header = document.querySelector("header");
  const donate = document.querySelector('header a[href*="raiseug"]');
  return {
    hamburgerExists: !!btn,
    hamburgerLabel: btn?.getAttribute("aria-label"),
    panelDisplay: cs?.display,
    panelPE: cs?.pointerEvents,
    panelVis: cs?.visibility,
    panelZ: cs?.zIndex,
    headerZ: header ? getComputedStyle(header).zIndex : null,
    donateExists: !!donate,
    donateHref: donate?.getAttribute("href"),
  };
});
console.log("MOBILE_STATE", JSON.stringify(state));

// elementFromPoint at hamburger center
const hit = await page.evaluate(() => {
  const btn = document.querySelector('button[aria-controls="mobile-nav"]');
  const r = btn.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const el = document.elementFromPoint(x, y);
  return {
    x,
    y,
    hitTag: el?.tagName,
    hitAria: el?.getAttribute?.("aria-label") || el?.closest?.("button")?.getAttribute("aria-label"),
    hitId: el?.id,
    inButton: !!el?.closest?.('button[aria-controls="mobile-nav"]'),
    inMobileNav: !!el?.closest?.("#mobile-nav"),
    inHeader: !!el?.closest?.("header"),
  };
});
console.log("HIT_HAMBURGER", JSON.stringify(hit));

await page.locator('button[aria-controls="mobile-nav"]').click();
await page.waitForTimeout(500);

const afterOpen = await page.evaluate(() => {
  const panel = document.getElementById("mobile-nav");
  const cs = getComputedStyle(panel);
  const btn = document.querySelector('button[aria-controls="mobile-nav"]');
  return {
    expanded: btn?.getAttribute("aria-expanded"),
    panelPE: cs.pointerEvents,
    panelVis: cs.visibility,
    panelOpacity: cs.opacity,
    bodyOverflow: document.body.style.overflow,
  };
});
console.log("AFTER_OPEN", JSON.stringify(afterOpen));

// Click Our Story in mobile menu
const storyLink = page.locator('#mobile-nav a[href="#story"]');
await storyLink.click();
await page.waitForTimeout(1000);
const afterStory = await page.evaluate(() => ({
  y: window.scrollY,
  hash: location.hash,
  storyTop: document.getElementById("story")?.getBoundingClientRect().top,
  menuOpen: document.querySelector('button[aria-controls="mobile-nav"]')?.getAttribute("aria-expanded"),
}));
console.log("AFTER_MOBILE_STORY", JSON.stringify(afterStory));

await browser.close();

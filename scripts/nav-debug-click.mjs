import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
});

await page.goto("http://127.0.0.1:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForSelector('button[aria-controls="mobile-nav"]');
await page.waitForTimeout(2000);

// Force native click + listen for React by checking expanded
const result = await page.evaluate(async () => {
  const btn = document.querySelector('button[aria-controls="mobile-nav"]');
  const before = btn.getAttribute("aria-expanded");
  btn.click();
  await new Promise((r) => setTimeout(r, 100));
  const afterNative = btn.getAttribute("aria-expanded");
  // dispatch full pointer sequence
  btn.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, cancelable: true }));
  btn.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, cancelable: true }));
  btn.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  await new Promise((r) => setTimeout(r, 100));
  const afterDispatch = btn.getAttribute("aria-expanded");
  return { before, afterNative, afterDispatch };
});
console.log("JS_CLICK", JSON.stringify(result));

// Playwright tap
await page.locator('button[aria-controls="mobile-nav"]').tap();
await page.waitForTimeout(300);
const afterTap = await page.evaluate(() =>
  document.querySelector('button[aria-controls="mobile-nav"]')?.getAttribute("aria-expanded"),
);
console.log("AFTER_TAP", afterTap);

// Check if React is on the page / hydration
const reactInfo = await page.evaluate(() => {
  const btn = document.querySelector('button[aria-controls="mobile-nav"]');
  const keys = Object.keys(btn).filter((k) => k.startsWith("__react"));
  const fiberKey = keys.find((k) => k.includes("Fiber") || k.includes("fiber"));
  const propsKey = keys.find((k) => k.includes("Props") || k.includes("props"));
  let hasOnClick = false;
  if (propsKey) {
    const props = btn[propsKey];
    hasOnClick = typeof props?.onClick === "function";
  }
  // React 19 might use different internals
  return {
    reactKeys: keys,
    hasOnClick,
    fiberKey: fiberKey || null,
  };
});
console.log("REACT_INFO", JSON.stringify(reactInfo));

await browser.close();

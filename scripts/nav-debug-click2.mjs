import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
});

await page.goto("http://127.0.0.1:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForSelector('button[aria-controls="mobile-nav"]');
await page.waitForTimeout(2500);

const info = await page.evaluate(() => {
  const btn = document.querySelector('button[aria-controls="mobile-nav"]');
  const names = Object.getOwnPropertyNames(btn).filter((k) => k.includes("react") || k.includes("React"));
  const all = [];
  for (const k in btn) if (String(k).includes("react") || String(k).includes("React")) all.push(k);
  // Walk up for fiber
  let el = btn;
  let found = null;
  while (el) {
    const props = Object.getOwnPropertyNames(el);
    const fiber = props.find((p) => p.startsWith("__reactFiber") || p.startsWith("__reactInternalInstance"));
    if (fiber) {
      found = { tag: el.tagName, fiber };
      break;
    }
    el = el.parentElement;
  }
  return {
    names,
    all,
    found,
    listenerCountApprox: typeof getEventListeners === "function" ? "n/a-browser" : "unknown",
  };
});
console.log("FIBER", JSON.stringify(info));

// Check debug logs were sent (hydration)
const hydrateOk = await page.evaluate(() => {
  return fetch("/api/debug-log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: "8ffb53",
      hypothesisId: "H7",
      location: "nav-debug-click2",
      message: "probe from playwright",
      data: { t: Date.now() },
      timestamp: Date.now(),
    }),
  }).then((r) => r.status);
});
console.log("API_STATUS", hydrateOk);

// Try setting open via clicking with Playwright force and checking DOM mutation
await page.locator('button[aria-controls="mobile-nav"]').click({ force: true });
await page.waitForTimeout(500);
console.log(
  "FORCE_CLICK_EXPANDED",
  await page.getAttribute('button[aria-controls="mobile-nav"]', "aria-expanded"),
);

// Is the client bundle even loading?
const scripts = await page.evaluate(() =>
  [...document.scripts].map((s) => s.src).filter(Boolean).slice(0, 8),
);
console.log("SCRIPTS", scripts);

const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(2000);
console.log("PAGE_ERRORS_AFTER_RELOAD", errors);

console.log(
  "EXPANDED_AFTER_RELOAD_CLICK",
  await page.evaluate(() => {
    const b = document.querySelector('button[aria-controls="mobile-nav"]');
    b.click();
    return b.getAttribute("aria-expanded");
  }),
);

await page.waitForTimeout(200);
console.log(
  "EXPANDED_AFTER_200MS",
  await page.getAttribute('button[aria-controls="mobile-nav"]', "aria-expanded"),
);

await browser.close();

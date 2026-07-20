import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

const responses = [];
page.on("response", async (res) => {
  const url = res.url();
  if (url.includes("/_next/") || url.includes(".js")) {
    responses.push({
      status: res.status(),
      url: url.replace("http://127.0.0.1:3000", ""),
      type: res.headers()["content-type"]?.slice(0, 40),
    });
  }
});
page.on("pageerror", (e) => console.log("PAGEERROR", e.message, e.stack?.split("\n").slice(0, 3)));
page.on("console", (m) => {
  if (m.type() === "error" || m.type() === "warning")
    console.log(m.type().toUpperCase(), m.text().slice(0, 400));
});

await page.goto("http://127.0.0.1:3000/", { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(4000);

console.log(
  "JS_RESPONSES",
  JSON.stringify(
    responses.filter((r) => r.url.includes("static") || r.status >= 400).slice(0, 40),
    null,
    2,
  ),
);
console.log("hydrated", await page.evaluate(() => window.__NAV_HYDRATED === true));
console.log(
  "TURBOPACK",
  await page.evaluate(() => ({
    hasTP: typeof window.TURBOPACK !== "undefined",
    nextKeys: Object.keys(window).filter((k) => /next|TURBO/i.test(k)),
  })),
);

await browser.close();

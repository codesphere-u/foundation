import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

const failed = [];
page.on("requestfailed", (req) =>
  failed.push({ url: req.url(), err: req.failure()?.errorText }),
);
page.on("response", (res) => {
  if (res.status() >= 400) failed.push({ url: res.url(), status: res.status() });
});

await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(3000);

const probe = await page.evaluate(async () => {
  // Did our Navbar mount effect run? Check if open-state was logged by looking at a marker.
  // Set a global from inline - can't. Instead check React root.
  const markers = {
    nextData: !!document.getElementById("__NEXT_DATA__"),
    bodyHtmlLen: document.body.innerHTML.length,
    hasSelfAttr: document.documentElement.hasAttribute("data-nextjs"),
  };

  // Try clicking donation amount button if present (client state)
  const amountBtn = document.querySelector("#donate button, #donate [role='button']");
  return {
    markers,
    amountBtn: amountBtn
      ? { tag: amountBtn.tagName, text: amountBtn.textContent?.slice(0, 40) }
      : null,
  };
});
console.log("PROBE", JSON.stringify(probe, null, 2));
console.log("FAILED", JSON.stringify(failed.slice(0, 30), null, 2));

// Check RSC / flight
const html = await page.content();
console.log("HAS_RSC", html.includes("self.__next_f"));
console.log("HAS_NEXT_F", /__next_f\.push/.test(html));

// Wait longer and check debug log via API count - send ping after waiting for hydrate
await page.waitForTimeout(2000);
const hydratedMarker = await page.evaluate(() => {
  // Navbar should set body overflow when open - try to find any client interactivity
  // Check if webpack/turbopack runtime exists
  return {
    webpackChunk: typeof window.webpackChunk_N_E !== "undefined",
    next: typeof window.next,
    keys: Object.keys(window).filter((k) => /next|__NEXT|turbopack/i.test(k)).slice(0, 20),
  };
});
console.log("WIN", JSON.stringify(hydratedMarker, null, 2));

await browser.close();

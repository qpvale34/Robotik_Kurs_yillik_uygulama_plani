// Cart flow smoke test for /malzemeler/index.html
// Usage: node scripts/malzemeler-smoke.mjs [baseUrl]
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.argv[2] || "http://127.0.0.1:8080";
const url = `${base}/malzemeler/index.html`;
mkdirSync("screenshots", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text()); });

await page.goto(url, { waitUntil: "networkidle" });
const title = await page.title();
const cardsD = await page.locator("#gridDeneyap .card").count();
const cardsR = await page.locator("#gridRobotistan .card").count();

// Add: 2x DENEYAP Kart 1A (628,00) = 1256,00
const dkCard = page.locator('#gridDeneyap .card[data-id="dk1a"]');
await dkCard.locator('[data-act="plus"]').click(); // qty 1 -> 2
await dkCard.locator('[data-act="add"]').click();
await page.locator("#closeCart").click();

// Add: HC-SR04 (75,33) once -> total 1331,33
await page.locator('#gridRobotistan .card[data-id="hcsr04"] [data-act="add"]').click();
await page.locator("#closeCart").click();

const barTotal = (await page.locator("#barTotal").textContent()).trim();
const barCount = (await page.locator("#barCount").textContent()).trim();
const sumD = (await page.locator("#sumDeneyap").textContent()).trim();
const sumR = (await page.locator("#sumRobotistan").textContent()).trim();

// Open cart, change qty -1 on HC-SR04 (75,33 removed) -> total 1256,00
await page.locator("#openCart").click();
await page.locator('.crow[data-id="hcsr04"] [data-cq="-1"]').click();
const sumR2 = (await page.locator("#sumRobotistan").textContent()).trim();
const sumTotal2 = (await page.locator("#sumTotal").textContent()).trim();
const rows = await page.locator(".crow").count();

// Persisted after reload?
await page.reload({ waitUntil: "networkidle" });
const barTotalAfterReload = (await page.locator("#barTotal").textContent()).trim();

await page.screenshot({ path: "screenshots/malzemeler-desktop.png", fullPage: false });

// Mobile check
const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mob.goto(url, { waitUntil: "networkidle" });
const overflow = await mob.evaluate(
  () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
);
await mob.screenshot({ path: "screenshots/malzemeler-mobile.png" });

const result = {
  url,
  title,
  cardsDeneyap: cardsD,
  cardsRobotistan: cardsR,
  afterAdds: { barTotal, barCount, sumD, sumR },
  afterQtyMinus: { sumR2, sumTotal2, cartRows: rows },
  barTotalAfterReload,
  mobileHorizontalOverflow: overflow,
  consoleErrors: errors,
};
console.log(JSON.stringify(result, null, 2));

const ok =
  cardsD > 0 &&
  cardsR > 0 &&
  barCount === "3" &&
  sumD.startsWith("1.256,00") &&
  sumR.startsWith("75,33") &&
  sumTotal2.startsWith("1.256,00") &&
  rows === 1 &&
  barTotalAfterReload.startsWith("1.256,00") &&
  !overflow &&
  errors.length === 0;
console.log(ok ? "SMOKE OK" : "SMOKE FAIL");
await browser.close();
process.exit(ok ? 0 : 1);

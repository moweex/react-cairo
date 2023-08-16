'use server';
import puppeteer from 'puppeteer-core';

export default async function screenshot(url: string) {
  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_TOKEN}`,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 330 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  await new Promise(resolve => setTimeout(resolve, 1000));
  const file = await page.screenshot({ type: 'png' });
  await browser.close();
  return file;
}

import puppeteer from 'puppeteer';
import { AxePuppeteer } from 'axe-puppeteer';

export const puppet = async (URL: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const inputtedUrl = `${URL}`;
  await page.setBypassCSP(true);

  await page.goto(inputtedUrl);

  const results = await new AxePuppeteer(page).analyze();

  await page.close();
  await browser.close();
  return results.violations;
};

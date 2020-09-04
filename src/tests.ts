import puppeteer from 'puppeteer';
import { AxePuppeteer } from 'axe-puppeteer';

// const APP = 'http://localhost:3000/';

export const puppet = async (URL: string): Promise<any> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const inputtedUrl = `${URL}`;
  await page.setBypassCSP(true);

  await page.goto(inputtedUrl);
  // await page.goto('http://www.google.com');

  const results = await new AxePuppeteer(page).analyze();

  await page.close();
  await browser.close();
  return results.violations;
};

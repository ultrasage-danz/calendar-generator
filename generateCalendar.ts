import fs from 'fs';
import puppeteer from 'puppeteer';
import ejs from 'ejs';

interface Slot {
  time: string;
}

interface DaySchedule {
  date: string;
  available_slots: Slot[];
}

const data: DaySchedule[] = [
  {
    "date": "2023-09-01",
    "available_slots": [
      { "time": "09:00" },
      { "time": "10:30" }
    ]
  },
  {
    "date": "2023-09-02",
    "available_slots": [
      { "time": "10:00" },
      { "time": "11:30" }
    ]
  }
  // Add more days as needed
];

const generateHTML = async (data: DaySchedule[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(__dirname + '/template.ejs', { data }, (err, str) => {
      if (err) {
        reject(err);
      } else {
        resolve(str);
      }
    });
  });
};

const generateImage = async (html: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  await page.screenshot({ path: 'calendar.png', fullPage: true });
  await browser.close();
};

const main = async () => {
  const html = await generateHTML(data);
  await generateImage(html);
};

main().catch(console.error);

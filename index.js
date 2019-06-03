const puppeteer = require('puppeteer');
const fs = require("fs");
const uuid = require("uuid/v4");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://store.line.me/stickershop/product/1136810/en');
  
  const imageElements = await page.evaluate(() => {
    const elements = document.querySelectorAll(".mdCMN09Image.FnPreview");
    const computedElements = [];
    for(let index = 0; index < elements.length; index++){
      const element = elements[index];
      const imageUrl = element.style.backgroundImage;
      computedElements.push(imageUrl.substring(5, imageUrl.length - 2));
    }
    return computedElements;
  })

  for(let index = 0; index < imageElements.length; index++){
    const url = imageElements[index];
    const viewSource = await page.goto(url);
    fs.writeFile(`downloads/Spoiled Rabbit/${uuid()}.png`, await viewSource.buffer(), err => console.log(err));
  }

  await browser.close();
})();
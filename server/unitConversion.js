const puppeteer = require('puppeteer');

async function converter(ingredients, toWhat) {
  ingredients = ingredients.join('\n');
  let url = 'https://convertrecipe.com/convert_metric_to_US.php';
  let textAreaInput = 'textarea#input_recipe_metric';
  let textAreaOutput = 'textarea#recipe_in_US';
  if (toWhat === 'metric') {
      url = 'https://convertrecipe.com/convert_US_to_metric.php';
      textAreaInput = 'textarea#recipe';
      textAreaOutput = 'textarea#recipe_in_metric';
  }
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector(textAreaInput);
  let input = await page.$(textAreaInput);
  await page.evaluate((el, ingredients) => el.value = ingredients, input, ingredients);
      
  await page.click('button.btn-primary'); 
  await page.waitForSelector(textAreaOutput);
  let text = await page.$(textAreaOutput);
  let result = await page.evaluate(el => el.value, text)
  await browser.close();
  return result;
};

module.exports  = {
  converter,
}
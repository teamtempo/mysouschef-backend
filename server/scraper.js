const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

async function scrapeData(url) {
    const results = [];
    try {
      // Fetch HTML of the page we want to scrape
      const { data } = await axios.get(url, {mode:'no-cors'});
      const $ = cheerio.load(data);
      //const method = $('div.grouped-list > ul');
      const lis = $('div.grouped-list > ul').find($('p'))
      //console.log((method.children().first().text()))
      //console.log((method.children().children().first().html()))
      lis.each((ind, el) => {
          const obj = {
              step: ind+1,
              details: $(el).text(),
              timer: 12
          }
          results.push(obj)
        })
        console.dir(results)
        return results;
    } catch (err) {
        console.error(err);
    }
}

module.exports = scrapeData;

const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

function getTimes(text) {
    const times = [["hr",3600], ["hours",3600], ["mins",60],["min",60], ["sec",1]];
    const splitText = text.split(" ")
    let number;
    let unit;

    times.forEach((time) => {
        //console.log(time[0])
        let pos = splitText.indexOf(time[0])
        if (pos > -1) {
            console.log(splitText[pos-1] * time[1]);
            number = (splitText[pos-1] * time[1]);
        }
    })
    return number;

    // let pos = splitText.indexOf("hr")
    // if (pos > -1) {
    //     number = splitText[pos-1]
    //     unit = 60 * 60;
    // }
    // pos = splitText.indexOf("mins")
    // if (pos > -1) {
    //     number = splitText[pos-1]
    //      unit = 60;
    // }
    // pos = splitText.indexOf("sec")
    // if (pos > -1) {
    //     number = splitText[pos-1]
    //      unit = 1;
    // }
    // console.log(text.indexOf("second"))
    // console.log(text.indexOf("hour"))
    // console.log(text.indexOf("hr"))

}


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
              timer: getTimes($(el).text())
          }
          results.push(obj)
        })
        console.dir(results)
        return results;
    } catch (err) {
        console.error(err);
    }
}

scrapeData('https://www.bbcgoodfood.com/recipes/strawberry-cheesecake-4-easy-steps')

module.exports = scrapeData;

const express = require('express');
const getTimes = require('./getTimes');
const recipeScraper = require("recipe-scraper");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true}))

app.get("/", (req,res) => {
  res.send("Server is running").status(200)
})

app.get('/recipe', async(req,res) => {
  const recipe = [];
  const url = req.query.url;
/*   recipeScraper("keyboard kitty").catch(error => {
    console.log(error.message);
    res.status(500).send(error.message)
  }); */
  const data = await recipeScraper(url)
  .then(response => {
    response.instructions.forEach((step,index) => {
      const obj = {
        step: index+1,
        details: step,
        timer: getTimes(step) || null
      }
      recipe.push(obj);
    });
    console.log(recipe)
    res.send(recipe);
  })
  .catch(error => {
    console.log(error.message);
    res.status(500).send(error.message);
    // => "No recipe found on page"
  })
});

app.listen(PORT, () => {
    console.log("Server listening on Port", PORT);
  });
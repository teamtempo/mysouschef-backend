const express = require('express');
const { getTimes, getSteps } = require('./getTimes');
const recipeScraper = require("recipe-scraper");
const { converter } = require('./unitConversion');

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
  const unit = req.query.unit;

  await recipeScraper(url)
  .then(async function(response) {
    response.instructions.forEach((step,index) => {
      const obj = {
        step: index+1,
        details: step,
        timer: getTimes(step) || null
      }
      recipe.push(obj);
    });
    const ing = await converter(response.ingredients, unit);
    recipe.unshift({ingredients:ing.split("\n")})
    recipe.unshift({title:response.name})
    res.send(recipe).status(200);
  })
  .catch(error => {
    console.log(error.message);
    res.status(500).send(error.message);
  })
});

app.listen(PORT, () => {
    console.log("Server listening on Port", PORT);
  });
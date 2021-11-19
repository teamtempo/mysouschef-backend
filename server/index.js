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

  await recipeScraper(url)
  .then(async (response) => {
    //console.log(response)
    response.instructions.forEach((step,index) => {
      const obj = {
        step: index+1,
        details: step,
        timer: getTimes(step) || null
      }
      recipe.push(obj);
    });
    const ing = await converter(response.ingredients, 'metric');
    recipe.unshift({ingredients:ing})
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
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
  recipeScraper(url)
  .then((recipeAllDetails) => {
    recipeAllDetails.instructions.forEach((step,index) => {
      const obj = {
        step: index+1,
        details: step,
        timer: getTimes(step) || null
      }
      recipe.push(obj);
    });
    res.send(recipe).status(200);
  })
  .catch(error => {
    console.log(error.message);
    res.send(error.message).status(500);
    // => "No recipe found on page"
  });
});

app.listen(PORT, () => {
    console.log("Server listening on Port", PORT);
  });
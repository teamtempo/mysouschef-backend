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

// enter a supported recipe url as a parameter - returns a promise
app.get('/recipe', async(req,res) => {
  const recipe = [];
  const url = req.query.url;
  try {
    let recipeAllDetails = await recipeScraper(url);
    recipeAllDetails.instructions.forEach((step,index) => {
      const obj = {
        step: index+1,
        details: step,
        timer: getTimes(step) || null
      }
      recipe.push(obj);
    });
    res.send(recipe).status(200);
  } catch (error) {
    console.log(error)
    res.send(500)
  }

})
/* 
app.get("/recipe", async (req, res) => {
  try {
    const url = req.query.url;
    const data = await scraper(url);
    res.send(data).status(200)
  } catch (error) {
    console.log(error)
    res.send(500)
  }
}) */

app.listen(PORT, () => {
    console.log("Server listening on Port", PORT);
  });
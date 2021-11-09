const express = require('express');
const scraper = require('./scraper');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true}))

app.get("/", (req,res) => {
  res.send("Hello, World!").status(200)
})

app.get("/recipe", async (req, res) => {
  try {
    const url = req.query.url;
    const data = await scraper(url);
    res.send(data).status(200)
  } catch (error) {
    console.log(error)
    res.send(500)
  }
})

app.listen(PORT, () => {
    console.log("Server listening on Port", PORT);
  });
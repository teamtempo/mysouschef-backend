const express = require('express');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true}))

app.get("/", (req,res) => {
  res.send("Hello, World!").status(200)
})

app.listen(PORT, () => {
    console.log("Server listening on Port", PORT);
  });
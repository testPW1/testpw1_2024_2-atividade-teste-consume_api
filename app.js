const express = require('express');
const app = express();
const axios = require("axios");
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const port = 3000;

app.listen(port, () => {
  console.log("Servidor rodando...");
});

app.use((req, res, next) => {
  let data = new Date();
  console.log(`Requisição recebida ${req.url} em `, data.toLocaleString('pt-BR'))
  next();
})

app.get('/', async (req, res) => {
  try {
    const bit = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json")
    //const quote = await axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
    res.render('index', {b: bit.data})
    //res.json(quote.data);
  } catch (err) {
    console.log(err)
  }
  
});

app.get('*', (req, res) => {
  res.sendStatus(404);
})
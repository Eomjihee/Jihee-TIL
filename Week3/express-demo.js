const express = require('express')
const app = express()

// GET
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000);
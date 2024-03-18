const express = require('express')
const app = express();

app.get('/test', (req, res) => {
  res.send('TEST SUCCESS')
})
app.get('/test/1', (req, res) => {
  res.send('ONE!')
})

app.listen(3000);
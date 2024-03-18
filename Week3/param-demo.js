const express = require('express');
const app = express();

app.get('/products/:id', (req, res) => {
  res.json({
    id : req.params.id
  })
})

app.listen(3000);
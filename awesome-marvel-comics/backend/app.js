const express = require('express')

var indexRouter = require('./routes/index')

const app = express()
const port = 3001

app.use(express.json());
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Awesome Marvel Comics API [Backend] listening on port ${port}`)
})

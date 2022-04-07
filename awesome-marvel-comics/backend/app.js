const express = require('express')

var routers = require('./routes')

const app = express()
const port = 3001

app.use(express.json());
app.use('/', routers);

app.listen(port, () => {
  console.log(`Awesome Marvel Comics API [Backend] listening on port ${port}`)
})

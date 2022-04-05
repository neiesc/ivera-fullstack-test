const express = require('express')

const crypto = require('crypto')
const axios = require('axios')

require('dotenv').config()

const app = express()
const port = 3001

app.get('/characters', (req, res) => {
  let md5sum = crypto.createHash('md5')

  let ts = Date.now();
  let toHash = ts + process.env.MARVEL_COMICS_PRIVATE_KEY + process.env.MARVEL_COMICS_PUBLIC_KEY

  let hash = md5sum.update(toHash).digest('hex')

  const params = { ts: ts, apikey: process.env.MARVEL_COMICS_PUBLIC_KEY, hash: hash }
  axios
    .get(`${process.env.MARVEL_COMICS_BASE_URL}/v1/public/characters`, { params: params })
    .then(result => {
      res.send(result.data)
    })
    .catch(error => {
      console.error(error)
    })
})

app.listen(port, () => {
  console.log(`API for Marvel Comics listening on port ${port}`)
})

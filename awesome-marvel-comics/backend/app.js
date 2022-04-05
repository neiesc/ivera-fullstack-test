const express = require('express')

const charactersService = require('./services/characters')

const app = express()
const port = 3001

app.get('/v1/characters', async (req, res) => { res.send(await charactersService.getAllCharacters()) })
app.get('/v1/characters/:characterId', async (req, res) => { res.send(await charactersService.getCharacter(req.params.characterId)) })

app.listen(port, () => {
  console.log(`Awesome Marvel Comics API [Backend] listening on port ${port}`)
})

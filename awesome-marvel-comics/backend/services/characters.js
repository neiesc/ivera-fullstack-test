const crypto = require('crypto')
const axios = require('axios')
const res = require('express/lib/response')
require('dotenv').config()

module.exports = {
    getAllCharacters: async (req, res) => {
        let md5sum = crypto.createHash('md5')

        let ts = Date.now();
        let toHash = ts + process.env.MARVEL_COMICS_PRIVATE_KEY + process.env.MARVEL_COMICS_PUBLIC_KEY
      
        let hash = md5sum.update(toHash).digest('hex')
        
        const params = { ts: ts, apikey: process.env.MARVEL_COMICS_PUBLIC_KEY, hash: hash }
        const result = await axios.get(`${process.env.MARVEL_COMICS_BASE_URL}/v1/public/characters`, { params: params })

        res.send(result.data)
    },
    getCharacter: async (req, res) => {
        let md5sum = crypto.createHash('md5')

        let ts = Date.now();
        let toHash = ts + process.env.MARVEL_COMICS_PRIVATE_KEY + process.env.MARVEL_COMICS_PUBLIC_KEY
      
        let hash = md5sum.update(toHash).digest('hex')
      
        const params = { ts: ts, apikey: process.env.MARVEL_COMICS_PUBLIC_KEY, hash: hash }
        const result = await axios.get(`${process.env.MARVEL_COMICS_BASE_URL}/v1/public/characters/${req.params.characterId}`, { params: params })

        res.send(result.data)
    }
}
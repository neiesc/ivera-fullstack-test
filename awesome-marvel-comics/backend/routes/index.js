const express = require('express');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');

const db = require('../db');
const historyRequestsMiddleware = require('../services/history-requests')
const charactersService = require('../services/characters')
const authenticationService = require('../services/authentication')

passport.use(new BearerStrategy(function(token, cb) {
  db.get('SELECT * FROM access_tokens WHERE token = ?', [
    token
  ], function(err, row) {
    console.log('GOT TOKEN');
    console.log(err);
    console.log(row);
    
    
    if (err) { return cb(err); }
    if (!row) { return cb(null, false); }
    var user = {
      id: row.user_id
    }

    return cb(null, user)  })
}))

const router = express.Router();

router.get('/v1/characters', historyRequestsMiddleware.logRequests, async (req, res) => { res.send(await charactersService.getAllCharacters()) })
router.get('/v1/characters/:characterId', historyRequestsMiddleware.logRequests, async (req, res) => { res.send(await charactersService.getCharacter(req.params.characterId)) })

router.get('/admin/history',
passport.authenticate('bearer', { session: false }), function(req, res, next) {
  next();
}, historyRequestsMiddleware.getAll);

router.post('/admin/login', authenticationService);

module.exports = router
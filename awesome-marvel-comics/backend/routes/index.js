const express = require('express');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
var crypto = require('crypto');

const db = require('../db');
const charactersService = require('../services/characters')

passport.use(new BearerStrategy(function(token, cb) {
  console.log(token)
  db.get('SELECT * FROM access_tokens WHERE value = ?', [
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

router.get('/v1/characters', async (req, res) => { res.send(await charactersService.getAllCharacters()) })
router.get('/v1/characters/:characterId', async (req, res) => { res.send(await charactersService.getCharacter(req.params.characterId)) })

router.get('/admin',
passport.authenticate('bearer', { session: false }), function(req, res, next) {
  next();
}, function(req, res) {
  console.log('User: ', req.user)
  res.send(req.user)
});

router.post('/admin/login', function(req, res, next) {
  db.get("SELECT * FROM users WHERE username = ?",
  [
    req.body.user
  ],
  function(err, row) {
    if (err) { return next(err); }
    if (!row) {
        res.json({ error: 'User or Password not match.' })
    }
    else {
      let salt = row.salt;
      let password = crypto.pbkdf2Sync(req.body.password, salt, 310000, 32, 'sha256');

      const isValid = Buffer.compare(password, row.hashed_password) === 0;
      if (isValid) {
        let token = crypto.randomBytes(16).toString('base64');
        db.run('INSERT INTO access_tokens (user_id, value) VALUES (?, ?)', [
          row.id,
          token
        ]);
        res.json({"token_type":"bearer","access_token": token })
      } else {
        res.json({ error: 'User or Password not match.' })
      }
    }
  });
});

module.exports = router
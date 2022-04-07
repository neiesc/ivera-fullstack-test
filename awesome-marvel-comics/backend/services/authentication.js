var crypto = require('crypto')

const db = require('../db')

module.exports = function(req, res, next) {
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
        db.run('INSERT INTO access_tokens (user_id, token) VALUES (?, ?)', [
          row.id,
          token
        ]);
        res.json({"token_type":"bearer","access_token": token })
      } else {
        res.json({ error: 'User or Password not match.' })
      }
    }
  });
}
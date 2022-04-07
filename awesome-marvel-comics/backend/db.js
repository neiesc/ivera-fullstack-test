var sqlite3 = require('sqlite3').verbose();
var crypto = require('crypto');

var db = new sqlite3.Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    username TEXT, \
    hashed_password BLOB, \
    salt BLOB \
  )")

  db.run("CREATE TABLE IF NOT EXISTS access_tokens ( \
    user_id TEXT UNIQUE, \
    value BLOB UNIQUE \
  )")

  var salt = crypto.randomBytes(16);
  db.run('INSERT OR IGNORE INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
    'admin',
    crypto.pbkdf2Sync('123456', salt, 310000, 32, 'sha256'),
    salt
  ]);
});

module.exports = db
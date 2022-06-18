var sqlite3 = require('sqlite3');
var mkdirp = require('mkdirp');

mkdirp.sync('./var/db');

var db = new sqlite3.Database('./var/db/discs.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS discs ( \
    id INTEGER PRIMARY KEY, \
    discname TEXT NOT NULL, \
    discmedia TEXT NOT NULL, \
    completed INTEGER, \
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL \
  )");
});

module.exports = db;
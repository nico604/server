var sqlite3 = require('sqlite3');
var mkdirp = require('mkdirp');

mkdirp.sync('./var/db');

var db = new sqlite3.Database('./var/db/todos.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS disc ( \
    id INTEGER PRIMARY KEY, \
    discname TEXT NOT NULL, \
    discmedia TEXT NOT NULL, \
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL \
  )");
});

module.exports = db;
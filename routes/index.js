var express = require('express');

var db = require('../db');

function fetchDisc(req, res, next) {
  db.all('SELECT id, * FROM disc WHERE owner_id = ?', [
    req.user.id
  ], function(err, rows) {
    if (err) { return next(err); }
    
    var discs = rows.map(function(row) {
      return {
        id: row.id,
        title: row.title,
        completed: row.completed == 1 ? true : false,
        url: '/' + row.id
      }
    });
    res.locals.todos = todos;
    res.locals.activeCount = todos.filter(function(todo) { return !todo.completed; }).length;
    res.locals.completedCount = todos.length - res.locals.activeCount;
    next();
  });
}




var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.user) { return res.render('home'); }
  next();
}, fetchDisc, function(req, res, next) {
  res.locals.filter = null;
  res.render('index', { user: req.user });
});

module.exports = router;

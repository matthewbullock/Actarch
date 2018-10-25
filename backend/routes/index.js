var express = require('express');
var router = express.Router();

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index', { title: 'Expressy' });
  });
  require('./api/comments')(app);
  // other routes entered here as require(route)(app);
  // we basically pass 'app' around to each route
}

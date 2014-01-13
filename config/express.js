var express = require('express');
var config = require('./config');

module.exports = function (app) {

  app.use(express.compress({
    filter: function(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  // Set views path, template engine and default layout
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  // Setting the fav icon and static folder
  app.use(express.favicon());
  app.use(express.static(config.root + '/public'));

  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  // Set routes
  app.use(app.router);
};
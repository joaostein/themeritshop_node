/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');

// Set node environment variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Initializing system variables
var config = require('./config/config');
var mongoose = require('mongoose');

// Database connection
var db = mongoose.connect(config.db);

// Models
require('./app/models/user');

var app = express();

// Express Settings
require('./config/express')(app);

// Routes
require('./config/routes')(app);

// Start the app
var port = process.env.PORT || config.port;
http.createServer(app).listen(port, function(){
  console.log('Express server listening on port ' + port);
});

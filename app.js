
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Mongoose
mongoose.connect('mongodb://localhost/themeritshop');

var UserSchema = mongoose.Schema({
  name: String,
  email: String,
  address: String
});

var User = mongoose.model('User', UserSchema);

// Show
app.get('/users', function (req, res) {
  User.find({}, function (err, docs) {
    res.render('users/index', { users: docs });
  });
});

// New
app.get('/users/new', function (req, res) {
  res.render('users/new');
});

// Create
app.post('/users', function (req, res) {
  var body = req.body;

  var user = new User ({
    name: body.name,
    email: body.email,
    address: body.address
  });

  user.save(function (err, user) {
    if (err) {
      res.json(err);
    }
    res.redirect('/users/' + user.name);
  });
});

app.param('name', function (req, res, next, name) {
  User.find({ name: name }, function (err, docs) {
    req.user = docs[0];
    next();
  });
});

// Show
app.get('/users/:name', function (req, res) {
  res.render('users/show', { user: req.user });
});

// Edit
app.get('/users/:name/edit', function (req, res) {
  res.render('users/edit', { user: req.user });
});

// Update
app.put('/users/:name', function (req, res) {
  var body = req.body;
  User.update({ name: req.params.name }, {
    name: body.name,
    email: body.email,
    address: body.address
  }, function(err) {
    res.redirect('users/' + body.name);
  });
});

// Delete
app.delete('/users/:name', function (req, res) {
  User.remove({ name: req.params.name }, function (err) {
    res.redirect('/users');
  })
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

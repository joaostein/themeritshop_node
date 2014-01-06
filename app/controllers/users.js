var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.showAll = function (req, res) {
  User.find({}, function (err, docs) {
    res.render('users/index', { users: docs });
  });
};

exports.new = function (req, res) {
  res.render('users/new');
};

exports.create = function (req, res) {
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
};

exports.findUser = function (req, res, next, name) {
  User.find({ name: name }, function (err, docs) {
    req.user = docs[0];
    next();
  });
};

exports.showUser = function (req, res) {
  res.render('users/show', { user: req.user });
};

exports.edit = function (req, res) {
  res.render('users/edit', { user: req.user });
};

exports.update = function (req, res) {
  var body = req.body;
  User.update({ name: req.params.name }, {
    name: body.name,
    email: body.email,
    address: body.address
  }, function(err) {
    res.redirect('users/' + body.name);
  });
};

exports.delete = function (req, res) {
  User.remove({ name: req.params.name }, function (err) {
    res.redirect('/users');
  })
};
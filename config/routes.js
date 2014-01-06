module.exports = function (app) {

  // User Routes
  var users = require('../app/controllers/users');
  app.param('name', users.findUser);
  app.get('/users', users.showAll);
  app.get('/users/new', users.new);
  app.post('/users', users.create);
  app.get('/users/:name', users.showUser);
  app.get('/users/:name/edit', users.edit);
  app.put('/users/:name', users.update);
  app.delete('/users/:name', users.delete);

  // Home route
  var index = require('../app/controllers/index');
  app.get('/', index.render);
};
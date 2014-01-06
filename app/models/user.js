var mongoose = require('mongoose');

// User Schema
var UserSchema = mongoose.Schema({
  name: String,
  email: String,
  address: String
});

mongoose.model('User', UserSchema);
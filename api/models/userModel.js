'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: String,
});

module.exports = mongoose.model('User', UserSchema);
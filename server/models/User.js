var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    adminID : String,
    password : String,
    firstname : String,
    lastname : String,
    role : String
 });


mongoose.model('User', UserSchema);

module.exports = mongoose.model;

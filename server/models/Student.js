var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId
var StudentSchema = new Schema({
    lrn : {type: String, unique : true},
    firstname : String,
    lastname : String,
    middlename : String,
    gender : String,
    yearlevel : Number,
    section : String,
    birthdate : Date,
    yearlevel : Number,
    age : Number
 });


mongoose.model('Student', StudentSchema);

module.exports = mongoose.model;

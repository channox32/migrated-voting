var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CandidateSchema = new Schema({
    fullname : {type: String, required : true},
    position : Number,
    partyList : String,
    votes : { type : Number, default : 0}
 });


mongoose.model('Candidate', CandidateSchema);

module.exports = mongoose.model;

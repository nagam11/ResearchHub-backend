/**
 * Created by Devgen on 16.06.2017.
 */
var mongoose = require('mongoose');

// Define our movie schema
var rating   = new mongoose.Schema({
    // _id: Number,
    company: String, //Temp string
    interestFields : String,
    overlapMessage: String

});

// Export the Mongoose model
module.exports = mongoose.model('ratings', rating);

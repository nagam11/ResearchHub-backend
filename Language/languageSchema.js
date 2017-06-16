/**
 * Created by Devgen on 15.06.2017.
 */

var mongoose = require('mongoose');

// Define our movie schema
var language   = new mongoose.Schema({
    _id: Number,
    language: String
});

// Export the Mongoose model
module.exports = mongoose.model('languages', language);

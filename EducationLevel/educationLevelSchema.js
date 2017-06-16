/**
 * Created by Devgen on 15.06.2017.
 */

var mongoose = require('mongoose');

// Define our EducationLevel schema
var educationLevel   = new mongoose.Schema({
    _id: Number,
    level: String
});

// Export the Mongoose model
module.exports = mongoose.model('educationlevels', educationLevel);

/**
 * Created by MarlaN 09.07.2017
 */
var mongoose = require('mongoose');

// Define company schema
var company   = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        unique:true
    }
});

// Export the Mongoose model
module.exports = mongoose.model('companies', company);
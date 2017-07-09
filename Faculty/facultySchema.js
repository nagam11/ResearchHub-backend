/**
 * Created by Devgen on 15.06.2017.
 */
var mongoose = require('mongoose');

// Define our Faculty schema
var faculty   = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        unique:true
    },
    chairs:[{ type: mongoose.Schema.Types.ObjectId, ref: 'chairs'}]
});

// Export the Mongoose model
module.exports = mongoose.model('faculties', faculty);

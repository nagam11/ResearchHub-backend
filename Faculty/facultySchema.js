/**
 * Created by Devgen on 15.06.2017.
 */
var mongoose = require('mongoose');

// Define our Faculty schema
var faculty   = new mongoose.Schema({
    _id: Number,
    name: {
        type:String,
        required:true,
        unique:true
    },
    chairs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chair'
    }]
});

// Export the Mongoose model
module.exports = mongoose.model('faculties', faculty);

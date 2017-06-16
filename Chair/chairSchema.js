/**
 * Created by Devgen on 15.06.2017.
 */
var mongoose = require('mongoose');

// Define our chair schema
var chair   = new mongoose.Schema({
    _id: Number,
    name: {
        type:String,
        required:true
    },
    faculty:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'faculties',
        required:true
    }
});

// Export the Mongoose model
module.exports = mongoose.model('chairs', chair);
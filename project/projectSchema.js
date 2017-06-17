// Load required packages
var mongoose = require('mongoose');

// Define our Project schema
var project   = new mongoose.Schema({
    _id: Number,
    title: String,
    projetType : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projecttypes',
        required:true
    },
    requeredLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'educationlevels'
    },
    chair:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'chairs'
    },
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'languages'
    },
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    requeredSkills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'skills'
        }],
    ratings: [{
        _id : Number,
        company: String,
        interestedFields:String,
        overLapMessage: String
    }]
});

// Export the Mongoose model
module.exports = mongoose.model('projects', project);

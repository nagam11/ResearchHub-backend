// Load required packages
var mongoose = require('mongoose');

// Define our Project schema
var project   = new mongoose.Schema({
    //_id: Number,

    createdOn : {type: Date,  "default": Date.now  },
    title: String,
    _projetType : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projecttypes',
      //  required:true
    },
    _requeredLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'educationlevels'
    },
    _chair:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'chairs',
        required:true
    },
    _language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'languages'
    },
    description: String,
    _advisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    _superadvisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    _requeredSkills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'skills'
        }],
    ratings: [{
        company: String,
        interestedFields:String,
        overLapMessage: String
    }]
});

// Export the Mongoose model
module.exports = mongoose.model('projects', project);

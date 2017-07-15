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
    _requeredLevel: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'educationlevels'
    }],
    _chair:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'chairs'
    },
    _partner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'companies'
    },
    _languages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'languages'
    }],
    description: String,
    _advisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academics'
    },
    _superadvisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academics'
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
project.index({title : 'text'});
// Export the Mongoose model
module.exports = mongoose.model('projects', project);

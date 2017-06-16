// Load required packages
var mongoose = require('mongoose');

// Define our Project schema
var project   = new mongoose.Schema({
    _id: Number,
    title: String,
    projetType : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectType',
        required:true
    },
    requeredLevel: {type: mongoose.Schema.Types.ObjectId,
        ref: 'EducationLevel'
    },
    language: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Language'
    },
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Export the Mongoose model
module.exports = mongoose.model('projects', project);

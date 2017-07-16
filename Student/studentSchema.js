var mongoose = require('mongoose');
var UserSchema = require('../user/userSchema');

var options = {discriminatorKey: 'kind'};

var student = UserSchema.discriminator('students',
    new mongoose.Schema({
    firstname: {
        type: String,
        // required: true,
        unique: false
    },
    lastname: {
        type: String,
        // required: true,
        unique: false
    },
    graduation: {
        type: Date,
        unique: false
    },
    major: {
        type: String,
        unique: false
    },
    minor: {
        type: String,
        unique: false
    },
    description: {
        type: String,
        unique: false
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    photo: {
        type: String,
        // required: true,
        unique: false
    },
    projectsApplied:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects'
    }],
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'faculties',
        // required:true
    },
    degree: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'educationlevels',
        // required:true
    },
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'skills'
    }]
},options));

module.exports = student;
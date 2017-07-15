var mongoose = require('mongoose');
var UserSchema = require('../user/userSchema');

var options = {discriminatorKey: 'kind'};

var student = UserSchema.discriminator('students',
    new mongoose.Schema({
    graduation: {
        type: Date
    },
    major: {
        type: String
    },
    minor: {
        type: String
    },
    description: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
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
        type:String
    }]
},options));

module.exports = student;
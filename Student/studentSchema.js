var mongoose = require('mongoose');
var UserSchema = require('../user/userSchema');

var options = {discriminatorKey: 'kind'};

var student = UserSchema.discriminator('students',
    new mongoose.Schema({
    projectsApplied:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects'
    }],
    faculty:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'faculties',
        // required:true
    }
    educationLevel:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'educationlevels',
        // required:true
    }
},options));

module.exports = student;
/**
 * Created by Devgen on 16.06.2017.
 */
var mongoose = require('mongoose');

// Define our movie schema
var skill   = new mongoose.Schema({
    _id: Number,
    skill: {type:String,
    unique:true,
        required:true}
});
skill.index({skill : 'text'});
// Export the Mongoose model
module.exports = mongoose.model('skills', skill);
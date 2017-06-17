/**
 * Created by Devgen on 15.06.2017.
 */
var mongoose = require('mongoose');

// Define our movie schema
var projecttype   = new mongoose.Schema({
    _id: Number,
    protjectType: {type: String, unique:true,required:true}
});

// Export the Mongoose model
module.exports = mongoose.model('projecttypes', projecttype);

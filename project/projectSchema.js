// Load required packages
var mongoose = require('mongoose');

// Define our movie schema
var Project   = new mongoose.Schema({
    title: String,
    description: String,
    advisor: String,
    supervisor: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Project', Project);

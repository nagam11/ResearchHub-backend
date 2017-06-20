/**
 * Created by Devgen on 15.06.2017.
 */
var mongoose = require('mongoose');
var userSchema = require('../user/userSchema');
// Define our Academic schema extends the user

var options = {discriminatorKey: 'kind'};
var academic = userSchema.discriminator('academic',
    new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    projects:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    chair:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chair',
        required:true
    }

},options));

// Export the Mongoose model
module.exports = mongoose.model('academics', academic);
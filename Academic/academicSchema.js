/**
 * Created by Devgen on 15.06.2017.
 */
var mongoose = require('mongoose');


var options = {discriminatorKey: 'kind'};
var academic = userSchema.discriminator('academics',
    new mongoose.Schema({

    projects:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects'
    }],
    chair:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chairs',
        // required:true
    }

},options));

// Export the Mongoose model
module.exports = mongoose.model('academics', academic);
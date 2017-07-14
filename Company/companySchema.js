var mongoose = require('mongoose');
var UserSchema = require('../user/userSchema');

var options = {discriminatorKey: 'kind'};

var academic = UserSchema.discriminator('companies',
    new mongoose.Schema({
    organization:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organizations'
    }],
    }
},options));

module.exports = company;
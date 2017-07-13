/**
 * Created by MarlaN 09.07.2017
 */
var mongoose = require('mongoose');
var UserSchema = require('../user/userSchema');

var options = {discriminatorKey: 'kind'};

var companyUser = UserSchema.discriminator('companyUsers',
    new mongoose.Schema({
        company:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'companies',
            required:true
        },
        ratings:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ratings',
        }]
    },options));

// Export the Mongoose model
module.exports = companyUser;
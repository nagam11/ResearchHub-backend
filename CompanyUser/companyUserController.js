/**
 * Created by MarlaN on 09.07.2017.
 */
 var Config = require('../config/config.js');
var CompanyUser = require('./companyUserSchema');
var User = require('../user/userSchema');
var jwt = require('jwt-simple');
var Q = require('q');
var _ = require('lodash');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.signup = function(req, res){
    if(!req.body.email){
        res.status(400).send('email required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }
    if(!req.body.company){
        res.status(400).send('company required');
        return;
    }

    var companyUser = new CompanyUser();

    companyUser.email = req.body.email;
    companyUser.password = req.body.password;
    companyUser.company = req.body.company;
    if(req.body.firstname) {
        companyUser.firstname = req.body.firstname;
    }
    if(req.body.lastname) {
        companyUser.lastname = req.body.lastname;
    }

    companyUser.save(function(err) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json({token: createToken(companyUser)});
    });
};

exports.getCompanyUsers = function(req,res){

    console.log('Finding company users ...');
    CompanyUser.find(function(err, companyUsers) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }

        console.log(companyUsers);
        sendJSONresponse(res, 200, companyUsers);
    });

};

function createToken(user) {
    var tokenPayload = {
        user: {
            _id: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        }

    };
    return jwt.encode(tokenPayload,Config.auth.jwtSecret);
};

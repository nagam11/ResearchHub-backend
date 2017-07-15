/**
 * Created by Devgen on 20.06.2017.
 */
 var Config = require('../config/config.js');
var Academic = require('./academicSchema');
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
    if(!req.body.chair){
        res.status(400).send('chair required');
        return;
    }

    var academic = new Academic();

    academic.email = req.body.email;
    academic.password = req.body.password;
    if(req.body.firstname) {
        academic.firstname = req.body.firstname;
    }
    if(req.body.lastname) {
        academic.lastname = req.body.lastname;
    }
    academic.chair = req.body.chair;

    academic.save(function(err) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json({token: createToken(academic)});
    });
};

exports.getAcademics = function(req,res){

    console.log('Finding academics ...');
    Academic.find(function(err, academics) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }


        console.log(academics);
        sendJSONresponse(res, 200, academics);
    });

};

exports.getAcademicById = function(req, res) {
    // Use the Movie model to find a specific movie
    console.log('Finding one chair ...:');
    Academic.findById(req.params._id, function(err, academic) {
        if (err) {
            res.status(500).send(err)
            return;
        };
        console.log(academic);
        sendJSONresponse(res, 200, academic);
    });
};


exports.createAcademic = function(req, res) {
    console.log("new academic : "+JSON.stringify(req.body));
    var academic = new Academic(req.body);
    console.log("new academic  created and try to save: "+JSON.stringify(academic));
    academic.save(function(err, m) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            return;
        }
        //res.status(201).json(m);
        //TODO fix this exeception
       /* if(assert.equal(academic.kind, 'academics')){
            console.log('its academic');
        }*/
        var sendJSONresponse = function(res, status, content) {
            console.log(status);
            res.status(status);
            res.json(content);
        };

    });
   /* var academic = new Academic({

        "username": "ga57som",
        "firstname": "Evgenij",
        "lastname": "Dauenhauer",
        "email": "e.dauenhauer@tum.de",
        "password": "123",
        "chair": {"_d": "594971b8d79ba836d4fe020e", "name": "Information systems"}

    });*/

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
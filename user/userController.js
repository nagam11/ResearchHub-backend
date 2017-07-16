var Config = require('../config/config.js');
var User = require('./userSchema');
var jwt = require('jwt-simple');
var Q = require('q');
var _ = require('lodash');

module.exports.login = function(req, res){
    if(!req.body.email){
        res.status(400).send('email required');
        return;
    }
    if(!req.body.password){
        res.status(400).send('password required');
        return;
    }

    User.findOne({email: req.body.email}, function(err, user){

        if (err) {
            res.status(500).send(err);
            return
        }

        if (!user) {
            res.status(401).send('Invalid Credentials');
            return;
        }
        user.comparePassword(req.body.password, function(err, isMatch) {
            if(!isMatch || err){
                res.status(401).send('Invalid Credentials');
            } else {
                res.status(200).json({token: createToken(user)});
            }
        });
    });

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

    var user = new User();

    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(err) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json({token: createToken(user)});
    });
};

module.exports.getCurrent = function(req, res) { 
    getById(req.params.id)
        .then(function (user) {
            if (user) {
                console.log('sending user');
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
    });
}

function getById(id) {
    var deferred = Q.defer();

    User.findById({_id:id}).lean().exec(function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'password'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

module.exports.update = function(req, res) {
    updateById(req.params.id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateById(id, userParam) {
    var deferred = Q.defer();

    // validation
    User.findById({_id:id}, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.email !== userParam.email) {
            // email has changed so check if the new email is already taken
            User.findOne(
                { email: userParam.email },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // email already exists
                        deferred.reject('Email "' + req.body.username + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            'firstname': userParam.firstname,
            'lastname': userParam.lastname,
            'email': userParam.email,
            'birthday': userParam.birthday,
            'degree': userParam.degree,
            'skills': userParam.skills,
            'description': userParam.description,
            'faculty': userParam.faculty,
            'major': userParam.major,
            'minor': userParam.minor,
            'graduation': userParam.graduation,
            'cv': 'blob'
        };

        // update password if it was entered
        //if (userParam.password) {
        //    set.hash = bcrypt.hashSync(userParam.password, 10);
        //}

        User.findByIdAndUpdate(
            { _id: id },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

module.exports.unregister = function(req, res) {
    req.user.remove().then(function (user) {
        res.sendStatus(200);
    }, function(err){
        res.status(500).send(err);
    });
};

function createToken(user) {
    var tokenPayload = {
        user: {
            _id: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            kind: user.kind
        }

    };
    return jwt.encode(tokenPayload,Config.auth.jwtSecret);
};
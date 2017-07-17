var Config = require('../config/config.js');
var Student = require('./studentSchema');
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

    var student = new Student();

    student.email = req.body.email;
    student.password = req.body.password;
    if(req.body.firstname) {
        student.firstname = req.body.firstname;
    }
    if(req.body.lastname) {
        student.lastname = req.body.lastname;
    }

    student.save(function(err) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json({token: createToken(student)});
    });
};

exports.getStudents = function(req,res){
    console.log('Finding students ...');
    Student.find(function(err, students) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }

        console.log(students);
        sendJSONresponse(res, 200, students);
    });
};

exports.getStudentById = function(req, res) {
    Student.findById(req.params._id, function(err, student) {
        if (err) {
            res.status(500).send(err)
            return;
        };
        console.log(student);
        sendJSONresponse(res, 200, student);
    });
};


exports.createStudent = function(req, res) {
    console.log("new student : "+JSON.stringify(req.body));
    var student = new Student(req.body);
    console.log("new student  created and try to save: "+JSON.stringify(student));
    student.save(function(err, m) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            return;
        }
        var sendJSONresponse = function(res, status, content) {
            res.status(status);
            res.json(content);
        };

    });
};

module.exports.updateStudent = function(req, res) {
    console.log('i am here');
    console.log(req.params.id);
    updateById(req.params.id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateById(id, studentParam) {
    var deferred = Q.defer();
    console.log("changing student");
    // validation
    Student.findById({_id:id}, function (err, student) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        console.log(id);
        console.log(studentParam);
        if (student.email !== studentParam.email) {
            // email has changed so check if the new email is already taken
            Student.findOne(
                { email: studentParam.email },
                function (err, student) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (student) {
                        // email already exists
                        deferred.reject('Email "' + req.body.email + '" is already taken')
                    } else {
                        updateStudent();
                    }
                });
        } else {
            updateStudent();
        }
    });

    function updateStudent() {
        // fields to update
        var set = {
            'firstname': studentParam.firstname,
            'lastname': studentParam.lastname,
            'email': studentParam.email,
            'birthday': studentParam.birthday,
            'degree': studentParam.degree,
            'skills': studentParam.skills,
            'description': studentParam.description,
            'faculty': studentParam.faculty,
            'major': studentParam.major,
            'minor': studentParam.minor,
            'graduation': studentParam.graduation,
            'projectsApplied': studentParam.projectsApplied,
            'cv': 'blob'
        };

        // update password if it was entered
        //if (studentParam.password) {
        //    set.hash = bcrypt.hashSync(studentParam.password, 10);
        //}

        Student.findByIdAndUpdate(
            { _id: id },
            { $set: set },
            function (err, student) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                deferred.resolve();
        });
    }
    return deferred.promise;
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

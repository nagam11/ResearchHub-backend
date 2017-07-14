var Student = require('./studentSchema');
var User = require('../user/userSchema');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
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
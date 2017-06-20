/**
 * Created by Devgen on 15.06.2017.
 */

//var mongoose = require('mongoose');
var Faculty = require('./facultySchema');
//var projectType = mongoose.model('ProjectType');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


exports.getFaculties = function(req,res){

    console.log('Finding faculties ...');
    Faculty.find().populate('chairs', 'name').exec(function(err, faculties) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }
        //    else if (!projectTypes) {
        //  sendJSONresponse(res, 404, "project types not found");
        // return;
        //}

        console.log(faculties);
        sendJSONresponse(res, 200, faculties);
    });

};

exports.getFacultyByid = function(req,res){


    if (req.params && req.params.fucultyid) {
        console.log('Finding faculties ...'+req.params.fucultyid);
        Faculty
            .findById(req.params.fucultyid)
            .exec(function(err, resfaculty) {
                /*if (!resfaculty) {
                    sendJSONresponse(res, 404, {
                        "message": "faculty with the id"+ fucultyid + "not found"
                    });
                    return;
                } else */
                if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log(resfaculty);
                sendJSONresponse(res, 200, resfaculty);
            });
    } else {
        console.log('No diet program id specified');
        sendJSONresponse(res, 404, {
            "message": "No locationid in request"
        });
    }

};
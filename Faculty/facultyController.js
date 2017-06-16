/**
 * Created by Devgen on 15.06.2017.
 */

//var mongoose = require('mongoose');
var faculty = require('./facultySchema');
//var projectType = mongoose.model('ProjectType');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


exports.getFaculties = function(req,res){

    console.log('Finding faculties ...');
    faculty.find(function(err, faculties) {
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
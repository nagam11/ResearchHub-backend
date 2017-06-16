/**
 * Created by Devgen on 15.06.2017.
 */
//var mongoose = require('mongoose');
var projectType = require('./projectTypeSchema');
//var projectType = mongoose.model('ProjectType');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


exports.getProjectTypes = function(req,res){

    console.log('Finding projecttypes ...');
    projectType.find(function(err, projectTypes) {
            if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
         //    else if (!projectTypes) {
          //  sendJSONresponse(res, 404, "project types not found");
           // return;
            //}

            console.log(projectTypes);
            sendJSONresponse(res, 200, projectTypes);
        });

};
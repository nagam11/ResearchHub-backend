/**
 * Created by Devgen on 16.06.2017.
 */
//var mongoose = require('mongoose');
var educationLevel = require('./educationLevelSchema');
//var projectType = mongoose.model('ProjectType');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


exports.getEducationLevels = function(req,res){

    console.log('Finding education levels ...');
    educationLevel.find(function(err, educationLevels) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }
        //    else if (!projectTypes) {
        //  sendJSONresponse(res, 404, "project types not found");
        // return;
        //}

        console.log(educationLevels);
        sendJSONresponse(res, 200, educationLevels);
    });

};

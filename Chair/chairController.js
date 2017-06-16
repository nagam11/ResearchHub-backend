/**
 * Created by Devgen on 16.06.2017.
 */
//var mongoose = require('mongoose');
var chair = require('./chairSchema');
//var projectType = mongoose.model('ProjectType');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


exports.getChairs = function(req,res){

    console.log('Finding projecttypes ...');
    chair.find(function(err, chairs) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }
        //    else if (!projectTypes) {
        //  sendJSONresponse(res, 404, "project types not found");
        // return;
        //}

        console.log(chairs);
        sendJSONresponse(res, 200, chairs);
    });

};

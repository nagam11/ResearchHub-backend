/**
 * Created by Devgen on 16.06.2017.
 */
//var mongoose = require('mongoose');
var Chair = require('./chairSchema');
//var projectType = mongoose.model('ProjectType');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

exports.getChairs = function(req,res){

    console.log('Finding chair ...');
    Chair.find(function(err, chairs) {
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
exports.getChair = function(req, res) {
    // Use the Movie model to find a specific movie
    console.log('Finding one chair ...:'+chair_id);
    Chair.findById(req.params.chair_id, function(err, chair) {
        if (err) {
            res.status(500).send(err)
            return;
        };
        console.log(chair);
        sendJSONresponse(res, 200, chair);
    });
};

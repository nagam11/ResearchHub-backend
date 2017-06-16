/**
 * Created by Devgen on 16.06.2017.
 */
//var mongoose = require('mongoose');
var languageSchema = require('./languageSchema');
//var projectType = mongoose.model('ProjectType');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


exports.getLanguages = function(req,res){

    console.log('Finding languages ...');
    languageSchema.find(function(err, languages) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }
        //    else if (!projectTypes) {
        //  sendJSONresponse(res, 404, "project types not found");
        // return;
        //}

        console.log(languages);
        sendJSONresponse(res, 200, languages);
    });

};
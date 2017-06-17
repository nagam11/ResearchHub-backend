/**
 * Created by Devgen on 16.06.2017.
 */
var skillSchema = require('./skillSchema');
//var projectType = mongoose.model('ProjectType');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


exports.getSkills = function(req,res){

    console.log('Finding skills ...');
    skillSchema.find(function(err, skills) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }
        //    else if (!projectTypes) {
        //  sendJSONresponse(res, 404, "project types not found");
        // return;
        //}

        console.log(skills);
        sendJSONresponse(res, 200, skills);
    });

};
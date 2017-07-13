/**
 * Created by MarlaN on 08.07.2017.
 */
var skillSchema = require('./skillSchema');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

// Create endpoint /api/skills for GET
exports.getSkills = function(req,res){

    console.log('Finding skills ...');
    skillSchema.find(function(err, skills) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }
        console.log(skills);
        sendJSONresponse(res, 200, skills);
    });

};
// Create endpoint /api/skills/:skill_term for GET
exports.searchForSkills = function(req, res) {
    skillSchema.find({
            $or: [
                {'skill': {'$regex': req.params.skill_term, '$options': 'i'}},
            ]
        }
    ).exec(function (err, skills) {
        console.log('name: ', skills);
        if (err) {
            res.status(400).send(err);
            return;
            console.error('error: ', err);
        }
        sendJSONresponse(res, 200, skills);
    });
};

exports.searchForSkill = function(req,res) {
    sendJSONresponse(res,200,[]);
}

/**
 * Created by Devgen on 05.07.2017.
 */

var Project = require('./projectSchema');
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};



exports.searchForProjects = function(req, res) {

    console.log('Project' + req.body);
    console.log('Finding projects ...');
    /*Project.find(function(err, projects) {
     if (err) {
     res.status(400).send(err);
     return;
     }
     console.log(projects);
     //res.json(projects);
     sendJSONresponse(res, 200, projects);
     }); */

   /* {"$text": {"$search": req.body.title}}*/
    console.log('Body query: ', JSON.stringify(req.body.title));
    Project.find( {$or: [
        {'title': {'$regex': req.body.title,'$options' : 'i'}},
        {'description': {'$regex': req.body.description,'$options' : 'i'}}
        ]}
    ).populate('_chair', 'name').populate('_projetType', 'protjectType').exec(function(err, projects) {
        console.log('name: ', projects);
        if (err) {
            res.status(400).send(err);
            return;
            console.error('eorro: ', err);
        }
        sendJSONresponse(res, 200, projects);
    });
    //sendJSONresponse(res, 200, '');



};

/**
 * Created by Devgen on 05.07.2017.
 */

var Project = require('./projectSchema');
var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};



exports.searchForProjects = function(req, res) {

    console.log('Project' + JSON.stringify(req.body));
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

    var query = {};

    var query = {};
    query['$or']= [];
    query['$or'] = [
        {'title': {'$regex': req.body.searchText,'$options' : 'i'}},
        {'description': {'$regex': req.body.searchText,'$options' : 'i'}},

    ];



    if(req.body.skills.length > 0) {

        query["_requeredSkills"] = { $in: req.body.skills};
        //query['$or'].push({'_requeredSkills' : { $in: req.body.skills}});
    }
    if(req.body.selectedLaguages.length > 0) {
        query["_languages"] = { $in: req.body.selectedLaguages};
    }
    if(req.body.selectedProjectTypes.length > 0) {



        query["_projetType"] = { $in: req.body.selectedProjectTypes};
    }

    // _partner
    if(req.body.companySelected == true) {
        query["_partner"] = {$ne: null};
    }


    console.log(JSON.stringify(query));



   /* var querySkills = {};

        Project.find( queryText
    ).populate('_chair', 'name').populate('_projetType', 'protjectType').populate('_requeredSkills','skill').exec(function(err, projects) {
        console.log('name: ', JSON.stringify(projects));
        if (err) {
            res.status(400).send(err);
            return;
            console.error('eorro: ', err);
        }
        sendJSONresponse(res, 200, projects);
    }); */

    Project.find( query ).populate('_chair', 'name').populate('_projetType', 'protjectType').populate('_requeredSkills','skill').populate('_advisor','username').exec(function(err, projects) {
        console.log('name: ', JSON.stringify(projects));
        if (err) {
            res.status(400).send(err);
            console.error('eorro: ', err);
            return;

        }
        sendJSONresponse(res, 200, projects);
    });

    /*Project.find( {$or: [
        {'title': {'$regex': req.body.searchText,'$options' : 'i'}},
        {'description': {'$regex': req.body.searchText,'$options' : 'i'}}
        ],

    }
    ).populate('_chair', 'name').populate('_projetType', 'protjectType').exec(function(err, projects) {
        console.log('name: ', projects);
        if (err) {
            res.status(400).send(err);
            return;
            console.error('eorro: ', err);
        }
        sendJSONresponse(res, 200, projects);
    });*/
    //sendJSONresponse(res, 200, '');



};

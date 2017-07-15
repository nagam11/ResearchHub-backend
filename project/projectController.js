// importing Project model
var Project = require('./projectSchema');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

exports.postProject = function(req, res) {
    var project = new Project(req.body);
    console.log(req.body);
    //do not allow user to fake identity. The user who postet the movie must be the same user that is logged in
 /*   if (!req.user.equals(project.user)) {
        res.sendStatus(401);
    }
    if (!req.projetType.equals(project.projetType)) {
        res.sendStatus(401);
    }*/
    //if (!req.chair.equals(project.chair)) {
    //    res.sendStatus(401);
    //}
    //project._chair =req.body.chair;
    project.save(function(err, m) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            return;
        }
        //res.status(201).json(m);
        var sendJSONresponse = function(res, status, content) {
            res.status(status);
            res.json(content);
        };

    });
};
// Create endpoint /api/projects for GET
exports.getProjects = function(req, res) {
    console.log('Finding projects ...');
    Project.find().populate('_languages','language').populate('_requeredLevel','level').populate('_requeredSkills','skill').populate('_partner','name').populate('_superadvisor',['firstname','lastname']).populate('_chair', 'name').populate('_projetType', 'protjectType').exec(function(err, projects) {
        console.log('name: ', projects);
        if (err) {
            res.status(400).send(err);
            return;
            console.error('eorro: ', err);
        }
        sendJSONresponse(res, 200, projects);
    });
};
// Create endpoint /api/projects/:project_id for GET
exports.getProject= function(req, res) {
   // console.log('Body query: ', JSON.stringify(req.body));
    // --Find project by ID and populate fields
    Project.findById(req.params.project_id).populate('_languages','language').populate('_requeredLevel','level').populate('_requeredSkills','skill').populate('_partner','name').populate('_superadvisor',['firstname','lastname']).populate('_chair', 'name').populate('_projetType', 'protjectType').exec(function(err, project) {
        console.log('name: ', project);
        if (err) {
            res.status(400).send(err);
            return;
            console.error('error: ', err);
        }
        sendJSONresponse(res, 200, project);
    });

};
// Create endpoint /api/projects/:project_id for PUT
exports.putProject = function(req, res) {
    // Use the Project model to find a specific movie and update it
    Project.findByIdAndUpdate(
        req.params.project_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, project) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(project);
    });
};
// Create endpoint /api/projects/:project_id for DELETE
exports.deleteProject = function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Project.findById(req.params.project_id, function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        m.remove();
        res.sendStatus(200);
    });
};

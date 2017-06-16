// importing Project model
var Project = require('./projectSchema');
exports.postProject = function(req, res) {
    var project = new Project(req.body);
    //do not allow user to fake identity. The user who postet the movie must be the same user that is logged in
    if (!req.user.equals(project.user)) {
        res.sendStatus(401);
    }
    project.save(function(err, m) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.status(201).json(m);
    });
};
// Create endpoint /api/projects for GET
exports.getProjects = function(req, res) {
  //TODO provisory response to endpoint
 // res.writeHead(200, {'Content-Type': 'text/plain'})
  //var txt = "there will soon be some projects here";
  //res.end(txt);
    Project.find(function(err, projects) {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.json(projects);
    });
};
// Create endpoint /api/projects/:project_id for GET
exports.getProject= function(req, res) {
    // Use the Project model to find a specific movie
    Project.findById(req.params.project_id, function(err, project) {
        if (err) {
            res.status(400).send(err)
            return;
        };

        res.json(project);
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

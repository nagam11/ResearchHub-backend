module.exports = projectRoutes;


function projectRoutes(passport) {

    var projectController = require('./projectController');
    var searchProjectController = require('./searchProjectController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET','POST','PUT','DELETE', 'OPTIONS']}));

    router.route('/')
        .post(projectController.postProject)
        .get(projectController.getProjects);

    router.route('/:project_id')
        .get(projectController.getProject)
        .put(projectController.putProject)
        .delete(projectController.deleteProject);

    router.route('/search').post(searchProjectController.searchForProjects);

    return router;
}

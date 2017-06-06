module.exports = projectRoutes;


function projectRoutes(passport) {

    var projectController = require('./projectController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/')
        .post(projectController.postProject)
        .get(projectController.getProjects);

    router.route('/:movie_id')
        .get(projectController.getProject)
        .put(projectController.putProject)
        .delete(projectController.deleteProject);

    return router;
}

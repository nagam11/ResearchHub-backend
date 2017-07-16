/**
 * Created by Devgen on 20.06.2017.
 */
module.exports = academicRoutes;

function academicRoutes(passport) {

    var academicController = require('./academicController');
    var router = require('express').Router();
    var unless = require('express-unless');

     var mw = passport.authenticate('jwt', {session: false});
     mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET','POST','PUT', 'OPTIONS']}));

    router.route('/').get(academicController.getAcademics);
    router.route('/').post(academicController.createAcademic);
    router.post('/signup', academicController.signup);
    router.route('/:academic_id').get(academicController.getAcademicById);
    router.route('/:academic_id').put(academicController.putAcademicbyId);
    /*  router.route('/:project_id')
     .get(projectController.getProject)
     .put(projectController.putProject)
     .delete(projectController.deleteProject);*/

    return router;
}
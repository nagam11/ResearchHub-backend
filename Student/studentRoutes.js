module.exports = studentRoutes;

function studentRoutes(passport) {

    var studentController = require('./studentController');
    var router = require('express').Router();
    var unless = require('express-unless');

     var mw = passport.authenticate('jwt', {session: false});
     mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET','POST','PUT', 'OPTIONS']}));

    router.route('/').get(studentController.getStudents);
    router.route('/').post(studentController.createStudent);
    router.route('/:student_id').get(studentController.getStudentById);

    return router;
}
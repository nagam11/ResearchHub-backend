module.exports = studentRoutes;

function studentRoutes(passport) {

    var studentController = require('./studentController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET','POST','PUT', 'OPTIONS']}));

    router.get('/', studentController.getStudents);
    router.post('/', studentController.createStudent);
    router.get('/:id', studentController.getStudentById);
    router.put('/update/:id', studentController.updateStudent);

    return router;
}
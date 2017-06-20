/**
 * Created by Devgen on 15.06.2017.
 */


module.exports = facultyRoutes;

function facultyRoutes(passport) {

    var facultyController = require('./facultyController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/').get(facultyController.getFaculties);
    router.route('/:fucultyid').get(facultyController.getFacultyByid);


    return router;
}
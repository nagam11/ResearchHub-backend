/**
 * Created by Devgen on 16.06.2017.
 */
module.exports = educationLevelRoutes;

function educationLevelRoutes(passport) {

    var educationLevelController = require('./educationLevelController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/').get(educationLevelController.getEducationLevels);

    return router;
}

/**
 * Created by Devgen on 15.06.2017.
 */

module.exports = projectTypesRoutes;

function projectTypesRoutes(passport) {

    var projectController = require('./projectTypeController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/').get(projectController.getProjectTypes);

    return router;
}
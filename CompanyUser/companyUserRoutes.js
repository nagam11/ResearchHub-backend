/**
 * Created by MarlaN on 09.07.2017.
 */

module.exports = companyUserRoutes;

function companyUserRoutes(passport) {

    var companyUserController = require('./companyUserController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET']}));

    router.route('/').get(companyUserController.getCompanyUsers);

    return router;
}

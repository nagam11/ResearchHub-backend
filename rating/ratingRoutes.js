/**
 * Created by Devgen on 16.06.2017.
 */
module.exports = skillRoutes;

function languagesRoutes(passport) {

    var skillController = require('./skillController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET','PUT', 'OPTIONS']}));

    router.route('/').get(skillController.getSkills);

    return router;
}
/**
 * Created by MarlaN on 08.07.2017.
 */
module.exports = skillRoutes;

function skillRoutes(passport) {

    var skillController = require('./skillController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET','PUT', 'OPTIONS']}));

    router.route('/').get(skillController.getSkills);
    router.route('/terms/:skill_term')
        .get(skillController.searchForSkills);
    router.route('/terms/')
        .get(skillController.searchForSkill);

    return router;
}

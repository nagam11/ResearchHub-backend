/**
 * Created by Devgen on 16.06.2017.
 */
/**
 * Modified by Moawiah. 08.07.2017
 */
//module.exports = skillRoutes;
module.exports = ratingRoutes;


function ratingRoutes(passport) {

    //var skillController = require('./skillController');
    var ratingController = require('./ratingController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET','POST', 'OPTIONS']}));

    //router.route('/').get(skillController.getSkills);
    router.route('/').get(ratingController.getRatings);
    router.route('/').post(ratingController.createRating);

    return router;
}
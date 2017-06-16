/**
 * Created by Devgen on 16.06.2017.
 */
module.exports = languagesRoutes;

function languagesRoutes(passport) {

    var languageController = require('./languageController');
    var router = require('express').Router();
    var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET', 'OPTIONS']}));

    router.route('/').get(languageController.getLanguages);

    return router;
}

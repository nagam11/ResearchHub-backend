module.exports = photoRoutes;

function photoRoutes(passport) {

    var photoController = require('./photoController');
    var router = require('express').Router();
	var unless = require('express-unless');

    var mw = passport.authenticate('jwt', {session: false});
    mw.unless = unless;

    //middleware
	router.use(mw.unless({method: ['GET','POST']}));


    //router.post('/');
    router.post('/', photoController.savePhoto);
    //router.get('/:id', photoController.getPhoto);

    return router;

}
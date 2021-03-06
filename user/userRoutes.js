module.exports = userRoutes;

function userRoutes(passport) {

    var userController = require('./userController');
    var router = require('express').Router();


    //router.post('/');
    router.post('/login', userController.login);
    router.post('/signup', userController.signup);
    router.post('/unregister', passport.authenticate('jwt', {session: false}),userController.unregister);
    router.get('/:id/favoritprojects',userController.getUserFavoritProjects);
    router.post('/:id/favoritprojects',userController.addFavoritProect);
    router.post('/:id/favoritprojects/:project_id',userController.deleteFavoritProject);
    router.get('/:id', userController.getCurrent);
    router.put('/update/:id', userController.update);

    return router;

}
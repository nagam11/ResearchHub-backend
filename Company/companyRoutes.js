module.exports = companyRoutes;

function companyRoutes(passport) {

    var companyController = require('./companyController');
    var router = require('express').Router();
    var unless = require('express-unless');

     var mw = passport.authenticate('jwt', {session: false});
     mw.unless = unless;

    //middleware
    router.use(mw.unless({method: ['GET','POST','PUT', 'OPTIONS']}));

    router.route('/').get(companyController.getCompanies);
    router.route('/').post(companyController.createCompany);
    router.route('/:company_id').get(companyController.getCompanyById);

    return router;
}
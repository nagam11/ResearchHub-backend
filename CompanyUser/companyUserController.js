/**
 * Created by MarlaN on 09.07.2017.
 */
var CompanyUser = require('./companyUserSchema');
var User = require('../user/userSchema');


var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


exports.getCompanyUsers = function(req,res){

    console.log('Finding company users ...');
    CompanyUser.find(function(err, companyUsers) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }

        console.log(companyUsers);
        sendJSONresponse(res, 200, companyUsers);
    });

};

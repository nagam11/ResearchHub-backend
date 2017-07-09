/**
 * Created by MarlaN on 09.07.2017.
 */
var Company = require('./companySchema');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


exports.getCompanies = function(req,res){

    console.log('Finding companies ...');
    Company.find(function(err, companies) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }

        console.log(companies);
        sendJSONresponse(res, 200, companies);
    });

};

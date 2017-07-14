var Company = require('./companySchema');
var User = require('../user/userSchema');

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

exports.getCompanyById = function(req, res) {
    Company.findById(req.params._id, function(err, company) {
        if (err) {
            res.status(500).send(err)
            return;
        };
        console.log(company);
        sendJSONresponse(res, 200, company);
    });
};


exports.createCompany = function(req, res) {
    console.log("new company : "+JSON.stringify(req.body));
    var company = new Company(req.body);
    console.log("new company created and try to save: "+JSON.stringify(company));
    company.save(function(err, m) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            return;
        }
        var sendJSONresponse = function(res, status, content) {
            res.status(status);
            res.json(content);
        };

    });
};
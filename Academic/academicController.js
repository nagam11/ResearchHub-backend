/**
 * Created by Devgen on 20.06.2017.
 */
var Academic = require('./academicSchema');
var User = require('../user/userSchema');


var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


exports.getAcademics = function(req,res){

    console.log('Finding academics ...');
    Academic.find(function(err, academics) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }


        console.log(academics);
        sendJSONresponse(res, 200, academics);
    });

};

exports.getAcademicById = function(req, res) {
    // Use the Movie model to find a specific movie
    console.log('Finding one chair ...:');
    Academic.findById(req.params._id, function(err, academic) {
        if (err) {
            res.status(500).send(err)
            return;
        };
        console.log(academic);
        sendJSONresponse(res, 200, academic);
    });
};


exports.createAcademic = function(req, res) {
    console.log("new academic : "+JSON.stringify(req.body));
    var academic = new Academic(req.body);
    console.log("new academic  created and try to save: "+JSON.stringify(academic));
    academic.save(function(err, m) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            return;
        }
        //res.status(201).json(m);
        if(assert.equal(academic.__t, 'academics')){
            console.log('its academic');
        }

        var sendJSONresponse = function(res, status, content) {
            res.status(status);
            res.json(content);
        };

    });
   /* var academic = new Academic({

        "username": "ga57som",
        "firstname": "Evgenij",
        "lastname": "Dauenhauer",
        "email": "e.dauenhauer@tum.de",
        "password": "123",
        "chair": {"_d": "594971b8d79ba836d4fe020e", "name": "Information systems"}

    });*/

};
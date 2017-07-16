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

// Create endpoint /api/projects/:project_id for PUT
exports.putAcademicbyId = function(req, res) {
    // Use the Project model to find a specific movie and update it
    console.log("updating academic by id");
    Academic.findByIdAndUpdate(
        req.params.academic_id,
        req.body,
        {
            //pass the new object to cb function
            new: true,
            //run validations
            runValidators: true
        }, function (err, academic) {
            if (err) {
                res.status(400).send(err);
                return;
            }
            console.log(req.params._id);
            res.json(academic);
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
        //TODO fix this exeception
       /* if(assert.equal(academic.kind, 'academics')){
            console.log('its academic');
        }*/
        var sendJSONresponse = function(res, status, content) {
            console.log(status);
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
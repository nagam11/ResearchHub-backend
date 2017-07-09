/**
 * Created by Devgen on 16.06.2017.
 */
//var mongoose = require('mongoose');
var Chair = require('./chairSchema');
var Faculty = require('../Faculty/facultySchema');
//var projectType = mongoose.model('ProjectType');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

exports.getChairs = function(req,res){

    console.log('Finding chair ...');
    Chair.find(function(err, chairs) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }
        //    else if (!projectTypes) {
        //  sendJSONresponse(res, 404, "project types not found");
        // return;
        //}

        console.log(chairs);
        sendJSONresponse(res, 200, chairs);
    });

};
exports.getChair = function(req, res) {
    // Use the Movie model to find a specific movie
    console.log('Finding one chair ...:');

    Chair.findById(req.params.chair_id).populate('faculty','name').exec(function(err, chair) {
        if (err) {
            res.status(500).send(err)
            return;
        };
        console.log(chair);
        sendJSONresponse(res, 200, chair);
    });
};

exports.createChair = function (req,res) {
    var chair = new Chair(req.body);
    console.log('Request'+JSON.stringify(req.body));
    chair.save(function(err, content) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            return;
        };
        console.log('Set referecne : ');
        console.log(content);
        //var facultyId = mongoose.Schema.Types.ObjectId;
        //facultyId = content.faculty;


        // TODO
        /*
        Faculty.findById(content.faculty, function(err, faculty) {
            if (err) {
                console.log('Not found: '+content.faculty)
                res.status(500).send(err);
                return;
            }; */

/*
        Faculty.findByIdAndUpdate(
                content.faculty,
                req.body,
                {
                    //pass the new object to cb function
                    new: true,
                    //run validations
                    runValidators: true
                }, function (err, movie) {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    }
                console.log('found : '+faculty);
                faculty.chairs.push(content);
                faculty.save(sendJSONresponse(res, status, faculty));
                sendJSONresponse(res, 200, content);
                }); */


            //console.log('found : '+faculty);
            //faculty.chairs.push(content._id);
            //faculty.save(sendJSONresponse(res, status, faculty));
            sendJSONresponse(res, 200, content);
        //});
    });
};

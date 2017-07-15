/**
 * Created by Devgen on 16.06.2017.
 */
//var skillSchema = require('./skillSchema');
//var projectType = mongoose.model('ProjectType');
var Rating = require('./ratingSchema');
var Company = require('../Company/companySchema');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
/*exports.getSkills = function(req,res){

    console.log('Finding skills ...');
    skillSchema.find(function(err, skills) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }
        //    else if (!projectTypes) {
        //  sendJSONresponse(res, 404, "project types not found");
        // return;
        //}

        console.log(skills);
        sendJSONresponse(res, 200, skills);
    });

};*/
exports.getRatings = function(req,res){

    console.log('Finding rating ...');
    Rating.find(function(err, ratings) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }
        //    else if (!projectTypes) {
        //  sendJSONresponse(res, 404, "project types not found");
        // return;
        //}

        console.log(ratings);
        sendJSONresponse(res, 200, ratings);
    });

};
// This function may not be important --- we may not need to process one rating alone
exports.getRating = function(req, res) {
    // Use the Movie model to find a specific movie
    console.log('Finding one rating ...:');

    Rating.findById(req.params._id).populate('ratings','company').exec(function(err, rating) {
        if (err) {
            res.status(500).send(err)
            return;
        };
        console.log(chair);
        sendJSONresponse(res, 200, rating);
    });
};
exports.createRating = function (req,res) {
    var rating = new Rating(req.body);
    console.log('Request'+JSON.stringify(req.body));
    rating.save(function(err, content) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
            return;
        };
        console.log('Set referecne : ');
        console.log(content);
        sendJSONresponse(res, 200, content);
    });
};
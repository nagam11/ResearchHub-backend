var Config = require('./config/config.js');
//to show a welcome screen
var http = require('http');
/**
 * MongoDB connection
 */
// var MongoClient = require('mongodb').MongoClient;
//var uri = Config.db.uri;
//MongoClient.connect(uri, function(err, db) {
//   if (err) {console.error(err); }

 //  console.log("Connected to ResearchHub Mongo DB");
 //  db.collection("projects").find({}).toArray(function(err, result) {
 //   if (err) throw err;
 //   console.log(result);
 // });
//   may be needed later ;
//db.close();

//});

/**
 * db connect
 */
var mongoose = require('mongoose');
mongoose.connect([Config.db.host, '/', Config.db.name].join(''),{
    //eventually it's a good idea to make this secure
    user: Config.db.user,
    pass: Config.db.pass
});


/**
 * create application
 */
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
/**
 * app setup
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//passport
var passport = require('passport');
var jwtConfig = require('./passport/jwtConfig');
app.use(passport.initialize());
jwtConfig(passport);
/**
 * routing
 */
var userRoutes = require("./user/userRoutes");
var projectRoutes = require("./project/projectRoutes");
var projectTypesRoutes = require("./ProjectType/projectTypeRoutes");
var educationLevels = require("./EducationLevel/educationLevelRoutes");
var languages = require("./Language/languageRoutes");
var chairs = require("./Chair/chairRoutes");
var facultyRoutes = require("./Faculty/facultyRoutes");
var skillRoutes = require("./skills/skillRoutes");
var academicsRoutes = require("./Academic/academicRoutes");
var companyRoutes = require('./Company/companyRoutes');
var companyUserRoutes = require('./CompanyUser/companyUserRoutes');
var ratingRoutes = require('./rating/ratingRoutes');
app.use('/api/projects', projectRoutes(passport));
app.use('/api/projecttypes',projectTypesRoutes(passport));
app.use('/api/user', userRoutes(passport));
app.use('/api/educationlevels',educationLevels(passport));
app.use('/api/languages',languages(passport));
app.use('/api/chairs',chairs(passport));
app.use('/api/faculties',facultyRoutes(passport));
app.use('/api/academics',academicsRoutes(passport));
app.use('/api/skills',skillRoutes(passport));
app.use('/api/companies',companyRoutes(passport));
app.use('/api/companyUsers',companyUserRoutes(passport));
app.use('/api/ratings',ratingRoutes(passport));
module.exports = app;

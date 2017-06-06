var Config = require('./config/config.js');
//to show a welcome screen
var http = require('http');
/**
 * MongoDB connection
 */
 var MongoClient = require('mongodb').MongoClient;
var uri = Config.db.uri;
MongoClient.connect(uri, function(err, db) {
   if (err) {console.error(err); }

   console.log("Connected to ResearchHub Mongo DB");
   db.collection("projects").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });
//   may be needed later ;
//db.close();
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
app.use('/api/projects', projectRoutes(passport));
app.use('/api/user', userRoutes(passport));
module.exports = app;

var Config = require('../config/config.js');
var Student = require('../Student/studentSchema'); 
var User = require('../user/userSchema');
var multer = require('multer');
var Q = require('q');
var fs = require('fs');
var DIR = './uploads/';

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.savePhoto = function (req, res, next) {
  var deferred = Q.defer();
  var upload = multer({dest: DIR}).single('photo');
  var path = '';

  if(!req.params.id){
      res.status(500).send('id required');
      return;
  }

  upload(req, res, function (err) {
      if (err) {
        // An error occurred when uploading
        console.log(err);
        return res.status(422).send("an Error occured")
      }  
      // No error occured.
      path = req.file.path;
      var set = { 'photo':path };
      Student.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
      return res.send("Upload Completed for "+path); 
  });  
};

module.exports.getPhoto = function(req,res){
  if(!req.params.id){
    res.status(500).send('id required');
    return;
  }

  var path = '';
  User.findById(req.params.id, function(err, user) {
        if (err) {
            res.status(500).send(err)
            return;
        };
        if (user.photo) {
          path = user.photo;
            fs.readFile(path, function(err, data) {
              if (err) throw err; // Fail if the file can't be read.
                res.writeHead(200, {'Content-Type': 'image/jpeg'});
                res.end(data); // Send the file data to the browser.
            });
        } else {
          path = 'uploads/photo';
            fs.readFile(path, function(err, data) {
            console.log(path);
            if (err) throw err; // Fail if the file can't be read.
              res.writeHead(200, {'Content-Type': 'image/jpeg'});
              res.end(data); // Send the file data to the browser.
          });
        }
    });
}
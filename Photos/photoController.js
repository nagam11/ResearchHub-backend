var Config = require('../config/config.js');
var multer = require('multer');
var DIR = './uploads/';

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.savePhoto = function (req, res, next) {
    var upload = multer({dest: DIR}).single('photo');
    var path = '';

    upload(req, res, function (err) {
      if (err) {
        // An error occurred when uploading
        console.log(err);
        return res.status(422).send("an Error occured")
      }  
      // No error occured.
      path = req.file.path;
      return res.send("Upload Completed for "+path); 
  });  
};
/**
 * Created by Devgen on 16.06.2017.
 */
/**
 * Modified by Moawiah. 08.07.2017
 */
var mongoose = require('mongoose');

// Define our movie schema
var rating   = new mongoose.Schema({
    //_id: Number,
    InterestFields: {
        type:String,
        required:true
      //  unique:true
    },
    Description: {
        type: String,
        required:true
     //   unique:true
    },
    Representative: {
        type:String,
        required:true
      //  unique:true
    }
  /*  company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'companies',
        required:true
    }*/
});

// Export the Mongoose model
module.exports = mongoose.model('ratings', rating);

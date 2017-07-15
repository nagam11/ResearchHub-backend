var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var options = {discriminatorKey: 'kind'};

var userSchema = mongoose.Schema({
    firstname: {
        type: String,
        // required: true,
        unique: false
    },
    lastname: {
        type: String,
        // required: true,
        unique: false
    },
    birthday: {
        type: Date,
        // required: true,
        unique: false
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},options);

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('users', userSchema);




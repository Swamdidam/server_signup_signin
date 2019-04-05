'use strict'

/*********************************************************
 Author:                Swam Didam Bobby 
 Year:                  2018
 File Discription:      Model for end users
/********************************************************/

// model dependencies
const
    mongoose                = require("mongoose"),
    bcrypt                  = require('bcryptjs');


// MONGOOSE MODEL CONFIGURATION
const UserSchema = new mongoose.Schema({

    
    email: {
        type: String,
        required: [true, 'Please enter a valid email address'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password 6 digit minimum'],
        minlength:6
    },
 
});

UserSchema.pre('save', function(next) {
    var User = this;
    bcrypt.hash(User.password, 10, function(err, hash) {
        if(err)
        {
            return next(err);
        }
        User.password = hash;
        next();
    })
})


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
module.exports = mongoose.model('User', UserSchema);



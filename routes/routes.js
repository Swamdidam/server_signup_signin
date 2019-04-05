'use strict';

/*********************************************************
 Authors:               Swam Didam Bobby 
 Year:                  2018
 File Discription:      Routing processes
/********************************************************/

/**
 * Dependencies
*/

const
    express  = require('express'),
    log      = require('../utils/logger').getLogger('routes'),
    _        = require('lodash'),
    bcrypt   = require('bcryptjs'),
    crypto   = require('crypto'),
    mongoose = require('mongoose'),
    request  = require('request'),
    User     = require('../models/User');



/**
 * Router instance
*/

const router = express.Router();


// GET /error-codes/:id

//============================================================================================
// User signup, login, find ...
//============================================================================================

/*
    to create a new user pass ---- {email, password}
*/

router.post("/CreateUser", function (req, res) {
    return User.create(req.body)
        .then(doc => {
            return res.status(200).json({ message: "User created", doc: doc });
        })
        .catch(err => {
            return res.status(500).json({ message: "Could not create user", err: err });

        })

});

//=============================================================================================
// User login router
//=============================================================================================


router.post('/loginUser', (req, res)=>{
    let candidatePassword = req.body.password

    // if (err) throw err;

    // fetch user and test password verification
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) console.log("fucked up")//throw err;

       // test a matching password
        if(user){
            user.comparePassword(candidatePassword, function(err, isMatch) {
                if (err) throw err;
                if(isMatch){
                    console.log(`${user.email} welcome back`); // -> Password123: true
                    return res.status(200).json({email:user.email});
                }
                else{
                    console.log(`User account not found`)
                    return res.status(401).json({message:"Please check Entered credentials"});
                }
            })

        // // test a failing password
        // bcrypt.comparePassword('123Password', function(err, isMatch) {
        //     if (err) throw err;
        //     console.log('No be match'); // -> 123Password: false
        // });
    }


})
})

//=============================================================================================
//Updating an existing user
//=============================================================================================

router.put('/updateUser', (req, res) => {
    return User.update({ "email": req.body.email },
        { $set: req.body })
        .then(doc => {
            log.info("Successfully updated user's details");
            return res.status(200).json({message: "user's detail update", doc: doc});
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({ message: "Unfurtunately an error has occured" });

        });
});


//=============================================================================================
// Search all registered users
//=============================================================================================

router.get("/viewAllUsers", function (req, res) {
    return User.find({})
        .then(doc => {
            return res.status(200).json({message: "User created",doc:doc});
        })
        .catch(err => {
            return res.status(500).json({message: "Cannot display list", err: err});
        })
      
  });

  
//=============================================================================
/**
* Module export
*/
//=============================================================================
module.exports = router;



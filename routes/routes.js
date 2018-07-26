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


router.post('/loginUser',(req, res)=>{
    
    if (req.body.email && req.body.password)
        User.authenticate(req.body.email, req.body.password, function (err, user) {
            if (err) 
                return res.json({status: 500, message: "An error occured! please check your provided details", err: err});
            else 
                return res.json({status:200, message:"Welcome back to home page"})
            
        })
    else 
        return res.status(400).json({info:"Both email and password are required"})
    


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



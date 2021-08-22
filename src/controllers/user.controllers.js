const User = require('../models/user.model');
const connectEnsureLogin = require('connect-ensure-login')
const passport = require('passport');
exports.findAll = (req, res, next) => {
    // passport.authenticate('local',
    // (err, user, info) => {
    User.find()
      .then(users => {
      res.send(users);
    }).catch(err => {
      res.status(500).send({
      message: err.message || "Something went wrong while getting list of users."
    });
    });
// })(req, res, next);
    };
    
    exports.create = (req, res) => {
        // Validate request
        if(!req.body) {
          return res.status(400).send({
          message: "Please fill all required field"
        });
        }
        // Create a new User
        const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.last_name,
          phone: req.body.last_name
        });
        // Save user in the database
        user.save()
          .then(data => {
          res.send(data);
        }).catch(err => {
          res.status(500).send({
          message: err.message || "Something went wrong while creating new user."
        });
        });
        };


        exports.findOne = (req, res) => {
            User.findById(req.params.id)
             .then(user => {
             if(!user) {
              return res.status(404).send({
              message: "User not found with id " + req.params.id
            });
           }
            res.send(user);
           }).catch(err => {
             if(err.kind === 'ObjectId') {
               return res.status(404).send({
               message: "User not found with id " + req.params.id
             });
           }
           return res.status(500).send({
             message: "Error getting user with id " + req.params.id
           });
           });
           };
           
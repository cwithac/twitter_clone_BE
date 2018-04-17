const db = require('../models/index.js');
const jwt = require('jsonwebtoken');

exports.signin = function() {

};

exports.signup = async function(req, res, next) {
  try {
    //Create a User (Registration)
    let user = await db.User.create(req.body);
    let {id, username, profileImageUrl} = user;
    //Create JWToken process.env...
    let token = jwt.sign({
      id,
      username,
      profileImageUrl
    }, process.env.SECRET_KEY);
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    })
  } catch(err) {
    //Validation Failure
    if(err.code === 11000) {
      err.message = "Sorry, that username and/or email is taken."
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

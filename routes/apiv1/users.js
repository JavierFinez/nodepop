'use strict';

const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const localConfig = require('../../localConfig');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res, next) => {
  try {

    const email = req.body.email;
    // Try to find in database
    const user = await User.findOne({ email }).exec();
    // If the user exists check the password
    if (!user) {
      res.json({ success: true, message: 'invalid credentials' });
      return;
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    console.log(passwordIsValid);

    // JWT creation
    jwt.sign({ user_id: user._id }, localConfig.jwt.secret, {
      expiresIn: localConfig.jwt.expiresIn,
    }, (err, token) => {
      if (err) {
        next(err);
        return;
      }
      // Send token to the client
      res.json({ success: true, token });
    });
  } catch (err) {
    next(err);
  }
});

router.post('/register', (req, res, next) => {

  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword,
  },
  (err, user) => {
    // JWT creation
    jwt.sign({ user_id: user._id }, localConfig.jwt.secret, {
      expiresIn: localConfig.jwt.expiresIn,
    }, (err, token) => {
      if (err) {
        next(err);
        return;
      }
      // Send token to the client
      res.json({ success: true, token });
    });
    if (err) return res.status(500).send("There was a problem registering the user.");
  }); 
});

module.exports = router;

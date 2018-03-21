import validator from 'validator';
import rules from 'password-rules';
import passport from 'passport';
import crypto from 'crypto';
import async from 'async';
import nodemailer from 'nodemailer';

import db from './../models';

const userController = {};

userController.authenticate = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error. Contact Support.',
      });
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.status(500).json({
        success: false,
        message: 'Username or password is invalid.',
      });
    }

    req.login(user, (loginErr) => {
      if (loginErr) {
        console.log(loginErr);
        return res.status(500).json({
          success: false,
          message: 'Internal Server Error. Contact Support.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'You have successfully logged in!',
        route: '/',
      });
    });
  })(req, res, next);
};

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(500).json({
      err: 'Username is required.',
    });
  }

  if (!password) {
    return res.status(500).json({
      err: 'Password is required',
    });
  }

  if (!validator.isEmail(username || '')) {
    return res.status(500).json({
      err: 'Not a valid email.',
    });
  }

  const passwordRules = rules(password, { requireNumber: false });

  if (passwordRules) {
    return res.status(500).json({
      err: passwordRules.sentence,
    });
  }

  db.User.create({
    username: username.toLowerCase(),
    email: username,
    password,
  }).then((createdUser) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status
      if (!user) {
        return res.status(500).json({
          success: false,
          message: 'Username or password is invalid.',
        });
      }
      req.login(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.status(200).json({
          success: true,
          message: 'You have successfully logged in!',
          route: '/',
        });
      });
    })(req, res, next);
  }).catch((err) => {
    return res.status(500).json({
      err: err.toString(),
    });
  });

}
userController.login = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  return res.status(200).render('login.html');
};

userController.signup = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  return res.status(200).render('signup.html');
};

userController.forgot = (req, res) => {
  return res.status(200).render('forgot.html');
};

export default userController;

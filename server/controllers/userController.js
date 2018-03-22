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
  const { username, password, email } = req.body;

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

  if (!validator.isEmail(email || '')) {
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
    email,
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
};

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

userController.reset = (req, res) => {
  return res.status(200).render('reset.html');
};

userController.sendPasswordChange = (req, res) => {
  const { username, email } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(500).json({
      message: 'Not a valid email',
      success: false,
    });
  }

  if (!username) {
    return res.status(500).json({
      message: 'Username is required',
      success: false,
    });
  }

  async.waterfall([
    (done) => {
      crypto.randomBytes(20, (err, buffer) => {
        const token = buffer.toString('hex');
        done(err, token);
      });
    },
    (token, done) => {
      db.User.findOne({
        where: {
          username,
          email,
        },
      }).then((user) => {
        if (!user) {
          return res.status(500).json({
            message: 'There isn\'t a user with that username and email',
            success: false,
          });
        }
        const date = Date.now() + (7 * 24 * 60 * 60 * 1000);

        user.updateAttributes({
          resetPasswordToken: token,
          resetPasswordExpires: date,
        });
        done(null, token, user);
      }).catch((err) => {
        done(err, null, null);
      });
    },
    (token, user, done) => {
      const smtpInfo = nodemailer.createTransport(process.env.EMAIL_CONNECTION_STRING);
      const mailOption = {
        to: user.email,
        from: 'no-reply@spectivvr.com',
        subject: 'Spectiv Password Reset',
        text: `You are receiving this email because you have requested for a password reset for your account.\n\nPlease click on the following link, or paste this into your browser to complete your password reset.\n\n http://${req.headers.host}/reset/${token}\n\n If you did not request this, please ignore this email and your password will remain unchanged.\n\n Please do not reply to this email.`,
        html: `<p>You are receiving this email because you have requested for a password reset for your account.</p><p>Please click on the following link, or paste this into your browser to complete your password reset.</p><p>http://${req.headers.host}/reset/${token}</p><p>If you did not request this, please ignore this email and your password will remain unchanged.</p><p>Please do not reply to this email.</p>`,
      };

      smtpInfo.sendMail(mailOption, (err) => {
        done(err, null);
      });
    },
  ], (err) => {
    if (err) {
      return res.status(500).json({
        err,
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
    });
  });
};

userController.changePassword = (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  async.waterfall([
    (done) => {
      db.User.findOne({
        where: {
          resetPasswordToken: token,
        },
      }).then((user) => {
        if (!user) {
          return res.status(500).json({
            message: 'There is no user with reset token.',
            success: false,
          });
        } else if (user.resetPasswordExpires < Date.now()) {
          return res.status(500).json({
            message: 'The time exceeded for the token please get a new token.',
            success: false,
          });
        }
        user.updateAttributes({
          password,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        });

        done(null, user);
      }).catch((err) => {
        done(err, null);
      });
    }, (user, done) => {
      const smtpInfo = nodemailer.createTransport(process.env.EMAIL_CONNECTION_STRING);
      const mailOption = {
        to: user.email,
        from: 'no-reply@spectivvr.com',
        subject: 'Your Spectiv password has been changed',
        text: `Hello, \n\n This is a confirmation email that your password has been changed for your ${user.email} account.\n\n If you did not request this change please contact the administrative.\n\n Please do not reply to this email.`,
        html: `<p>Hello, </p><p>This is a confirmation email that your password has been changed for your ${user.email} account.</p><p>If you did not request this change please contact the administrative.</p><p>Please do not reply to this email.</p>`,
      };

      smtpInfo.sendMail(mailOption, (err) => {
        done(err, null);
      });
    },
  ], (err) => {
    if (err) {
      return res.status(500).json({
        err,
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
    });
  });
};

userController.logout = (req, res) => {
  req.logOut();
  req.session.destroy();
  res.redirect('/');
};


export default userController;

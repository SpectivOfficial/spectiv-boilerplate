import passport from 'passport';
import validator from 'validator';
import crypto from 'crypto';
import async from 'async';
import nodemailer from 'nodemailer';

import db from './../models';

const userController = {};

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

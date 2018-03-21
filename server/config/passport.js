import passport from 'passport';
import passportLocal from 'passport-local';
import db from './../models';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // Find User here
  db.User.findOne({
    where: { id: user.id },
    attributes: {
      exclude: ['password'],
    },
  }).then((dbUser) => {
    done(null, dbUser);
  }).error((err) => {
    done(err, null);
  });
});

passport.use(new LocalStrategy(
  (username, password, done) => {
    // Authenticate purpose find the user and validate password
    db.User.findOne({
      where: { username: db.Sequelize.where(db.Sequelize.fn('lower', db.Sequelize.col('username')), db.Sequelize.fn('lower', username)) },
    }).then((user) => {
      const pwd = user ? user.password : '';
      db.User.validatePassword(password, pwd, done, user);
    }).catch((err) => {
      console.log(err);
      done(err, null);
    });
  },
));

import bcrypt from 'bcrypt-nodejs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isInactive: {
      type: DataTypes.BOOLEAN,
    },
  });

  User.validatePassword = (password, pwd, done, user) => {
    bcrypt.compare(password, pwd, (err, isMatch) => {
      if (err) {
        return done (null, false);
      }
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false);
    });
  };

  User.beforeCreate((user, options) => {
    const salt = bcrypt.genSalt(process.env.SALT_WORK_FACTOR, (err, gennedSalt) => {
      return gennedSalt;
    });

    return (new Promise((resolve, reject) => {
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    })).then((hash) => {
      user.password = hash;
    }).catch((err) => {
      throw new Error(err);
    });
  });

  User.beforeUpdate((user, options) => {
    const salt = bcrypt.genSalt(process.env.SALT_WORK_FACTOR, (err, gennedSalt) => {
      return gennedSalt;
    });

    return (new Promise((resolve, reject) => {
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    })).then((hash) => {
      user.password = hash;
    }).catch((err) => {
      throw new Error(err);
    });
  });

  return User;
};

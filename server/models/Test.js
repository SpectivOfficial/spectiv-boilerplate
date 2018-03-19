export default (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    name: DataTypes.STRING,
  });

  return Test;
};

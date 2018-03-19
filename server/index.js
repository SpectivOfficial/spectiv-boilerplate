import app from './app';
import db from './models';

const { PORT } = process.env;

db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`ITS ALIVE ON PORT ${PORT}`);
    });
  }).catch((err) => {
    console.error(err);
  });

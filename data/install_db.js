const conn = require('../lib/connectMongoose');
const Ad = require('../models/Ad');
const User = require('../models/User');

const data = require('./ads.json');
const users = require('./users.json');

conn.once('open', async () => {
  try {
    await Ad.deleteMany({}).catch((err) => {
      throw new Error(err);
    });
    console.log('Removed all the data from database.');

    await Ad.insertMany(data).catch((err) => {
      throw new Error(err);
    });
    console.log('Inserted all the data into database.');

    await User.deleteMany({}).catch((err) => {
      throw new Error(err);
    });
    console.log('Removed all the users from database.');

    await User.insertMany(users).catch((err) => {
      throw new Error(err);
    });
    console.log('Inserted all the users into database.');

    conn.close();
    console.log('Connection with database closed.');
  } catch (err) {
    console.log('Se ha producido un error en la ejecución del script', err);

    conn.close();
    console.log('Connection with database closed.');
  }
});

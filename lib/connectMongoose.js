const mongoose = require('mongoose');

const conn = mongoose.connection;

conn.on('error', (err) => {
  console.log('mongodb error', err);
});

conn.once('open', () => {
  console.log('Connected to mongodb at ', conn.name);
});

mongoose.connect('mongodb://localhost/nodepop');

module.exports = conn;

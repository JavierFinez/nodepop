const mongoose = require('mongoose');

// schema definition
const adSchema = mongoose.Schema({
  name: { type: String, index: true },
  sale: { type: Boolean, index: true },
  price: { type: Number, index: true },
  photo: String,
  tags: { type: [String], index: true },
});

// static model
adSchema.statics.list = function (filter, skip, limit, fields, sort) {
  // build the query
  const query = Ad.find(filter);
  query.skip(skip);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);

  // execute the query and return a promise
  return query.exec();
};

// model creation
const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;

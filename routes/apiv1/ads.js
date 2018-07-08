const express = require('express');

const router = express.Router();

const Ad = require('../../models/Ad');

const jwtAuth = require('../../lib/jwtAuth.js');

router.get('/', jwtAuth(), async (req, res, next) => {
  try {
    const name = req.query.name;
    const sale = req.query.sale;
    const tags = req.query.tags;
    const price = req.query.price;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const fields = req.query.fields;
    const sort = req.query.sort;

    const filter = {};

    if (name) {
      filter.name = new RegExp(`^${name}`, 'i');
    }
    if (typeof (sale) !== 'undefined') {
      filter.sale = sale;
    }
    if (typeof (tags) !== 'undefined') {
      filter.tags = { $in: tags.split(/,|\s/) };
    }
    if (typeof (price) !== 'undefined') {
      let priceArray = price.split('-');
      priceArray = priceArray.map(parseFloat);

      if (priceArray.length === 1) {
        filter.price = priceArray[0];
      } else if (!isNaN(priceArray[0]) && !isNaN(priceArray[1])) {
        filter.price = { $gte: priceArray[0], $lte: priceArray[1] };
      } else if (!isNaN(priceArray[0])) {
        filter.price = { $gte: priceArray[0] };
      } else if (!isNaN(priceArray[1])) {
        filter.price = { $lte: priceArray[1] };
      }
    }

    const ads = await Ad.list(filter, skip, limit, fields, sort);
    res.json({ success: true, result: ads });
  } catch (err) {
    next(err);
  }
});

router.get('/tags', jwtAuth(), async (req, res, next) => {
  try {
      const tags = await Ad.distinct('tags');
      res.json({ success: true, data: tags });
  } catch(err) {
    next(err);
  }
});


module.exports = router;

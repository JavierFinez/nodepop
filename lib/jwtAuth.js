const jwt = require('jsonwebtoken');
const localConfig = require('../localConfig');

module.exports = function (user, pass) {
  return (req, res, next) => {
    // getting the token
    const token = req.body.token || req.query.token || req.get('x-acess-token');

    if (!token) {
      const err = new Error('no token provided');
      err.status = 401; // Unauthorized
      next(err);
      return;
    }

    jwt.verify(token, localConfig.jwt.secret, (err, decoded) => {
      if (err) {
        err.status = 401; // Unauthorized
        next(err);
        return;
      }
      next();
    });
  };
};

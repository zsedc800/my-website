var jwt = require('jwt-simple');
var validator = require('validator');
var { User: UserModel } = require('../../models');
var config = require('../../config');
exports.auth = function (req, res, next) {
  var accessToken = String(req.cookies['1_&token'] || req.body.accessToken || req.query.accessToken);
  accessToken = validator.trim(accessToken);
  if (!accessToken) {
    res.status(401);
    return res.send({ ret: false, msg: '请登录' });
  }
  var { uid } = jwt.decode(accessToken, config['json_token_secret']);
  UserModel.findById(uid).then(user => {
    if (!user) {
      res.status(401);
      return res.send({ ret: false, msg: 'accessToken无效'});
    }
    req.user = user;
    req.session.user = user;
    next();
  });
};

exports.tryAuth = function (req, res, next) {
  var accessToken = String(req.cookies['1_&token'] || req.body.accessToken || req.query.accessToken);
  accessToken = validator.trim(accessToken);
  var { uid } = jwt.decode(accessToken, config['json_token_secret']);
  UserModel.findById(uid).then(user => {
    if (!user) {
      return next();
    }
    req.user = user;
    req.session.user = user;
    next();
  });
};
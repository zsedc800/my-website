exports.adminRequired = function (req, res, next) {
  if (!req.session.user) {
    return res.send({ ret: false, msg: '未登录' });
  }
  if (!req.session.user.is_admin) {
    return res.send({ ret: false, msg: '需要管理员权限' });
  }
  next();
};

exports.userRequired = function (req, res, next) {
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(403).send('forbidden!');
  }
  next();
};

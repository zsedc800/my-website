const config = require('../config');
const jwt = require('jwt-simple');
const moment = require('moment');
const { User } = require('../models');
const logger = require('../common/logger').getLogger('controller/sign');
exports.showSignup = function (req, res, next) {
  res.render('signup', { title: 'zsedc800' });
};

exports.signup = async function (req, res, next) {
  let options = req.body;
  let { loginname } = options;
  let username = '';
  try {
    username = await User.findOne({ loginname }, 'loginname');
    username = username.loginname;
  } catch (error) {
    logger.error('username query failed err is: ', error.message);
    return next(error);
  }
  if (username === loginname) {
    return res.status(400).send({ ret: false, msg: '该用户已存在' });
  }
  let user = new User(options);
  user.save().then(result => {
    res.redirect('/signin');
  }).catch(e => {
    logger.error('signup failed error: ', e.message);
  });
};

exports.showLogin = function (req, res, next) {
  res.render('login');
};

exports.login = async function (req, res, next) {
  let { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ ret: false, msg: '账号或密码不能为空' });
  }
  let user = await User.findOne({ loginname: username, pass: password }) || null;
  if (!user) {
    return res.status(400).send({ ret: false, msg: '账号或密码错误' });
  }
  let expired = moment(7, 'day').valueOf();
  let token = jwt.encode({
    uid: user.id,
    exp: expired
  }, config['json_token_secret']);
  res.cookie('1_&token', token);
  res.send({ ret: true, msg: 'login success' });
};
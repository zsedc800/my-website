var { connect } = require('mongoose');
var config  = require('../config');
var Logger = require('../common/logger');
var logger = Logger.getLogger('models/index');
var User = require('./user');
var Article = require('./article');
var Comment = require('./comment');
var Reply = require('./reply');
var Message = require('./message');
conenct(config.db, {
  server: { poolSize: 20 }
}, (err) => {
  if (err) {
    logger.error('connect to %s error: ', config.db, err.message);
    prcoess.exit(1);
  }
});

module.exports = {
  User,
  Article,
  Comment,
  Reply,
  Message
};
var mongoose= require('mongoose');
var config  = require('../config');
var Logger = require('../common/logger');
var logger = Logger.getLogger('models/index');
mongoose.Promise = global.Promise;
mongoose.connect(config.db, {
  useMongoClient: true
}, (err) => {
  if (err) {
    logger.error('connect to %s error: ', config.db, err.message);
    prcoess.exit(1);
  }
});
var User = require('./user');
var Article = require('./article');
var Comment = require('./comment');
var Reply = require('./reply');
var Message = require('./message');

module.exports = {
  User,
  Article,
  Comment,
  Reply,
  Message
};
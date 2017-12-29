var commentController = require('./comment')
var articleController = require('./article');
var replyController = require('./reply');
var messageController = require('./message');
var userController = require('./user');

module.exports = {
  commentController,
  articleController,
  messageController,
  userController,
  replyController
}
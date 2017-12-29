var express = require('express');
const {
  articleController,
  commentController,
  userController,
  replyController,
  messageController
} = require('./api/v1');
var config = require('./config');
var router = express.Router();

//文章
router.get('/articles', articleController.index);
router.get('/articles/:id', articleController.show);
router.post('/articles', articleController.create);
router.post('/articles/update', articleController.update);

// 评论
router.post('/article/:article_id/comments', commentController.create);
router.post('/reply/:comment_id/up', replyController.create);

module.exports = router;
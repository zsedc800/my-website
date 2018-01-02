const { Comment: CommentModel } = require('../../models');
const { CommentServ } = require('../../service');
const logger = require('../../common/logger').getLogger('api/v1/comment');
const create = (req, res, next) => {
  let comment = req.body;
  let commentModel = new CommentModel(comment);
  commentModel.save().then(result => {
    logger.info(result);
    res.send({ ret: true, msg: '评论成功' });
  }).catch(e => {
    logger.error('comment create failed becase: ', e.message);
    next();
  });
};

const getAll = (req, res, next) => {
  let articleId = req.params.article_id;
  CommentServ.getComments(articleId).then(comments => {
    res.send({ ret: true, data: { comments }});
  }).catch(e => {
    logger.error('find comments get a error: ', e.message);
    next();
  });
};
module.exports = {
  create,
  getAll
}
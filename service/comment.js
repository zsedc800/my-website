var { Comment: CommentModel } = require('../models');
exports.getComments = function (id) {
  return CommentModel.find({ article_id: id }).then(comments => {
    
  });
}
const { Comment: CommentModel } = require('../models');
const { User: UserModel } = require('../models');
const ReplyServ = require('./reply');
exports.getComments = function (id) {
  return CommentModel.find({ article_id: id }).then(async (comments) => {
    let asyncComments = comments.map((comment) => {
      let uid = comments.from_uid;
      return UserModel.findOne({ _id: uid }).then(user => {
        comment.avatar_url = user.avatar_url;
      }).then(() => {
        return ReplyServ.getRepliesById(comment.id);
      }).then(replies => {
        comment.replies = replies;
      })
    });
    return Promise.all(asyncComments).then(() => {
      return comments;
    });
  });
}
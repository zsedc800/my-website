const { Reply: ReplyModel } = require('../models');
exports.getRepliesById = function (id) {
  return ReplyModel.find({ comment_id: id })
}
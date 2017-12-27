/**
 * 评论模型
 */

var { model, Schema } = require('mongoose');
var { ObjectId } = Schema;

var CommentSchema = new Schema({
  id: { type: ObjectId },
  top_id: { type: ObjectId },
  from_uid: { type: ObjectId },
  top_type: { type: String },
  content: { type: String },
  content_is_html: { type: Boolean },
  create_at: { type: Date, default: Date.now }
});

CommentSchema.index({ create_at: -1 });

module.exports = model('Comment', CommentSchema);
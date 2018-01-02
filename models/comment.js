/**
 * 评论模型
 */
var mongoose = require('mongoose');
var { Schema } = require('mongoose');
var { ObjectId } = Schema;

var CommentSchema = new Schema({
  article_id: { type: ObjectId },
  top_id: { type: ObjectId },
  from_uid: { type: ObjectId },
  top_type: { type: String },
  content: { type: String, unique: true },
  content_is_html: { type: Boolean },
  create_at: { type: Date, default: Date.now }
});

CommentSchema.index({ create_at: -1 });

module.exports = mongoose.model('Comment', CommentSchema);
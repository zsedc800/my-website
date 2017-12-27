/**
 * 回复模型
 */
var { model, Schema } = require('mongoose');
var { ObjectId } = Schema;

var ReplySchema = new Schema({
  id: { type: ObjectId },
  comment_id: { type: ObjectId },
  reply_id: { type: ObjectId },
  from_uid: { type: ObjectId },
  to_uid: { type: ObjectId },
  content: { type: String },
  content_is_html: { type: Boolean },
  create_at: { type: Date, default: Date.now }
});

ReplySchema.index({ create_at: -1 });

module.exports = model('Reply', ReplySchema);
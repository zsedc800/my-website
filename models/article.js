/**
 *  文章模型
 */
var { Schema, model } = require('mongoose');
var { ObjectId } = Schema;
var config = require('../config');

var ArticleSchema = new Schema ({
  title: { type: String },
  content: { type: String },
  author_id: { type: ObjectId },
  top: { type: Boolean, default: false },
  good: { type: Boolean, default: false }, //优质内容
  lock: { type: Boolean, default: false }, //锁定的禁止评论的
  reply_count: { type: Number, default: 0 }, //评论数,
  visit_count: { type: Number, default: 0 }, //访问数
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
  last_reply: { type: ObjectId },
  last_reply_at: { type: Date, default: Date.now },
  content_is_html: { type: Boolean },
  category: { type: String },
  deleted: { type: Boolean, default: false }
});

ArticleSchema.index({ create_at: -1 });
ArticleSchema.index({ top: -1, last_reply_at: -1 });
ArticleSchema.index({ author_id: 1, create_at: -1 });

module.exports = model('Article', ArticleSchema);


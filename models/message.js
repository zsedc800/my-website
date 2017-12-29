/**
 * 消息模型
 */
var mongoose = require('mongoose');
var { Schema } = require('mongoose');
var { ObjectId } = Schema;

var MsgSchema = new Schema({
  create_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MsgSchema);
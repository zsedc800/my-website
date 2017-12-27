/**
 * 消息模型
 */
var { model, Schema } = require('mongoose');
var { ObjectId } = Schema;

var MsgSchema = new Schema({
  id: { type: ObjectId },
  create_at: { type: Date, default: Date.now }
});

module.exports = model('Message', MsgSchema);
/**
 * 用户模型
 */
var { model, Schema } = require('mongoose');
var { ObjectId }  = Schema;

var UserSchema = new Schema({
  name: { type: String },
  loginname: { type: String },
  avatar: { type: String }
});

module.exports = model('User', UserSchema);


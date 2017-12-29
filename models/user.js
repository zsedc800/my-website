/**
 * 用户模型
 */
var mongoose = require('mongoose');
var { Schema } = mongoose;
var { ObjectId }  = Schema;

var UserSchema = new Schema({
  name: { type: String, unique: true },
  loginname: { type: String, unique: true },
  pass: { type: String },
  email: { type: String },
  url: { type: String },
  profile_image_file: { type: String },
  location: { type: String },
  profile: { type: String },
  weiobo: { type: String },
  avatar: { type: String },
  githubId: { type: String },
  githubUsername: { type: String },
  githubAccessToken: { type: String },
  is_block: { type: Boolean, default: false },
  is_admin: { type: Boolean, default: false },
  topic_count: { type: Number, default: 0 },
  replay_count: { type: Number, default: 0 },
  accessToken: { type: String }
});

UserSchema.virtual('avatar_url').get(function () {
  var url = this.avatar;
});

UserSchema.pre('save', function (next) {
  var now = new Date();
  this.update_at = now;
  next();
});

module.exports = mongoose.model('User', UserSchema);


var { User: UserModel } = require('../models');
exports.getUserById = function (id) {
  return UserModel.findOne({ _id: id })
}
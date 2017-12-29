exports.query_handle = function (name, callback) {
  return function (err, res) {
    if (err) {
      logger.error(`${name} error: `, err.message);
      throw err;
    } else {
      if (!res) {
        logger.warn(`${name} find null`);
      } else {
        callback(res);
      }
    }
  }
};

exports.pick = function (obj = {}, props = []) {
  var target = {};
  props.forEach(prop => {
    target[prop] = obj[prop];
  })
  return target;
}

exports.isMongoId = (id) => {

}
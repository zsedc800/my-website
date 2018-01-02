const { Reply: ReplyModel } = require('../../models');
const logger = require('../../common/logger').getLogger('api/v1/reply');
const create = (req, res, next) => {
  let reply = req.body;
  let replyModel = new ReplyModel(reply);
  replyModel.save().then(result => {
    logger.info('create reply to db success result: ', result);
    res.send({ ret: true, msg: 'reply success' });
  }).catch(e => {
    logger.error('reply save error: ', e.message);
    next();
  });
}
module.exports = {
  create
};

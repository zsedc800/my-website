/**
 * article 模型的操作集
 */
var { Article } = require('../models');
var UserServ = require('./user');
var CommentServ = require('./comment');
var Logger = require('../common/logger');
var logger = Logger.getLogger('service/article');
function _getArticleById (id) {
  return new Promise ((resolve, reject) => {
    Article.findOne({ _id: id }, (err, article) => {
      if (err) {
        logger.error('article findOne error: ', err.message);
        throw err;
        return;
      }
      if (!article) {
        reject(new Error('can not find article'));
      } else {
        resolve(article);
      }
    });
  });
}

exports.getArticleById = function () {

}

exports.getCountByQuery = function () {

}

/**
 * 获取文章的所有信息
 * Promise result
 *  - message 消息
 *  - article 文章
 *  - author 文章作者
 *  - comments 文章评论
 * @param {String} id 主题ID 
 * @returns {Promise} 返回查询结果Promise
 */
exports.getFullArticle = function (id) {
  return Article.findOne({ _id: id, deleted: false })
    .then(async (article) => {
      let pre = await Article.findOne({ create_at:  { $lt: article.create_at }}, '_id', { limit: 1, sort: '-create_at' }) || null;
      let next = await Article.findOne({ create_at: { $gt: article.create_at }}, '_id', { limit: 1, sort: 'create_at' }) || null;
      article.pre = pre;
      article.next = next;
      return {
        article
      };
    });
};
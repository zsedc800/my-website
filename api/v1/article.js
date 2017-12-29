const { User: UserModel, Article: ArticleModel } = require('../../models');
const { ArticleServ, UserServ } = require('../../service');
const config = require('../../config');
const Logger = require('../../common/logger');
const logger = Logger.getLogger('api/v1/article');
const { query_handle, pick } = require('../../common/utils');
const validator = require('validator');

const  index =  (req, res, next) => {
  var page = parseInt(req.query.page, 10) || 1;
  page = page > 0 ? page : 1;
  var category = req.query.category || 'all';
  var pageSize = Number(req.query.pageSize) || config.list_article_count;
  var query = {};
  var options = { skip: (page - 1) * pageSize, limit: pageSize, sort: '-create_at' };
  
  ArticleModel.find(query, '', options).then(async (articles) => {
    articles.map( async (article) => {
      let author = await UserModel.findById(article.author_id)
      article.author = pick(author, ['loginname', 'avatar_url']);
      article = pick(article, ['id', 'author_id', 'title', 'reply_count', 'visit_count', 'create_at', 'description']);
      return article;
    });
    return articles;
  }).then(articles => {
    res.send({ ret: true, data: articles });
  }).catch(e => {
    logger.error('get error when find articles message: ', e.message);
    next();
  });
};

const show = async (req, res, next) => {
  var articleId = String(req.params.id);
  if (!validator.isMongoId(articleId)) {
    res.status(400);
    return res.send({ ret: false, msg: '文章id无效' });
  }
  let article  = null;
  try {
    article = await ArticleServ.getFullArticle(articleId).then(({ article, author}) => {
      if (!article) {
        res.status(404);
        return res.send({ ret: false, msg: '文章不存在' });
      }
      article = pick(article, ['id', 'author_id', 'category', 'content', 'title', 'last_reply_at', 'reply_count', 'visit_count', 'create_at', 'author']);
      article.author = pick(author, ['loginname', 'avatar_url']);
      return article;
    });
    res.send({ ret: true, data: article });
  } catch (e) {
    logger.error('throw error when getFullArticle message: ', e.message);
    next();
  }
};

const create = (req, res, next) => {
  let options = req.body;
  let user = req.session.user;
  let article = new ArticleModel(options);
  return;
  article.save().then(res => {
    res.send({ ret: true, msg: 'article save success' });
  }).catch(e => {
    logger.error('article save error: ', e.message);
    next();
  })
};

const update = (req, res, next) => {
  let options = req.body || {};
  let id = options.id;
  delete options.id;
  Article.update({ _id: id }, { $set: options }).then(res => {
    logger.debug('article update info: ', res);
    res.send({ ret: true, msg: 'article update success' });
  }).catch(e => {
    logger.error('article update error: ', e.message);
    next();
  });
};

const search = (req, res, next) => {
  let keyword = req.params.kw;
  let patern = new RegExp(keyword, "i");
  Article.find({ title: pattern }, ['title', '_id', 'create_at']).then(docs => {
    res.send({ ret: true, data: { docs } });
  }).catch(e => {
    logger.error('article search error: ', e.message);
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  search
};
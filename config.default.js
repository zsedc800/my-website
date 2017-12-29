var path = require('path');
var config = {
  debug: true,
  hostname: 'localhost',
  db: 'mongodb://localhost/node_blog_dev',
  redis_host: '127.0.0.1',
  redis_port: 6379,
  redis_db: 0,
  redis_password: '305381',

  session_secret: 'your_secret',
  auth_cookie_name: 'your_name',
  json_token_secret: 'your_token_secret',

  entry_port: process.env.NODE_ENV === 'production' ? 80 : 8082,
  static_port: 8081,
  blog_port: 8080,
  list_article_size: 10,

  log_dir: path.join(__dirname, 'logs')
};

if (process.env.NODE_ENV === 'test') {
  config.db = 'mongodb://127.0.0.1/node_blog_test'
}

module.exports = config;
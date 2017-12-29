var log4js = require('log4js');
var config = require('../config')
log4js.configure({
  appenders: {
    dateLog: {
      type: 'dateFile',
      filename: config.log_dir + '/warn',
      pattern: '.yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    warnTip: {
      type: 'logLevelFilter',
      level: 'warn',
      appender: 'dateLog'
    },
    out: {
      type: 'stdout'
    }
  },
  categories: {
    default: {
      appenders: ['warnTip', 'out'],
      level: 'info'
    }
  }
});


module.exports = log4js
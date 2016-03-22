var historyFallback = require('connect-history-api-fallback');
var log = require('connect-logger');
var bodyParser = require('body-parser');
var apiMiddleware = require('./mock/apiMiddleware');

module.exports = {
  injectChanges: false,
  files: ['./**/*.{html,htm,css,js}'],
  server: {
    baseDir: './',
    middleware: [
      log({format: '%date %status %method %url'}),
      historyFallback({index: '/index.html'}),
      bodyParser.json(),
      apiMiddleware()
    ]
  }
};

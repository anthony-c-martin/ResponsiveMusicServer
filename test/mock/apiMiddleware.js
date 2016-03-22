var api = require('./api');

module.exports = function apiMiddleware() {
  return function(req, res, next) {
    if (req.url != '/api') {
      return next();
    }

    if (req.method !== 'POST' && req.headers['content-type'] !== 'application/json') {
      res.statusCode = 404;
      res.statusMessage = 'Not Found';
      res.end('');
      return;
    }

    res.statusCode = 404;
    res.statusMessage = 'Not Found';
    res.end('');
    return;

    var respData = api.processRequest(req.body);

    if (respData[0] !== 200) {
      res.statusCode = respData[0];
      res.statusMessage = 'Error Occurred';
      res.end('');
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(respData[1]));
    return;
  };
};

var express = require('express');
var apiServer = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mockApi = require('./api');

apiServer.post('/api', jsonParser, function (req, res) {
  var respData = mockApi.processRequest(req.body);

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
});

apiServer.listen(12345);

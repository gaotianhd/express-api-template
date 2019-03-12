const express = require('express');
// const request = require('request');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const route = require('./routes');
const middleware = require('./middleware');
const mongooseUrl = require('./config').mongooseUrl;

// require('./rabbitmq')()

const http = require('http');

const server = http.createServer();

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({server});

let list = global.webSocketList;
wss.on('connection', function connection(ws, req) {
  console.log(req.url);
  // const user = req.url.split('//')[1];
  const user = req.url.split('/')[1];
  if (user) {
    console.log("one client connection: " + user);
    list[user] = ws;
  } else {
    console.log('user is not');
  }
  ws.on('message', function incoming(message) {

  });
});

const app = express();
module.exports = async function () {
  /* mongo默认连接 */

  // mongoose.Promise = global.Promise;
  // mongoose.connect(mongooseUrl, {useNewUrlParser: true});
  // mongoose.set('useCreateIndex', true);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 60*1000
  }))
  app.use('/public',express.static('public'));
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Content-Length,Authorization,Accept,X-Access-Token");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

  app.use('/api/test',route.testroute);

  const port = process.env.PORT || 3000;

  server.on('request', app);

  server.listen(port, function() {
      console.log('Listening on ' + port)
  });

  // app.listen(port, function() {
  //     console.log('Listening on ' + port)
  // });
}

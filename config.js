const path = require('path');
/*项目路径*/
exports.root = __dirname;
/*websocket连接列表*/
global.webSocketList = {}

exports.mongooseUrl = 'mongodbUrl'

exports.aliOSSConfig = {
  region: 'region',
  accessKeyId: 'accessKeyId',
  accessKeySecret: 'accessKeySecret',
  bucket: 'bucket'
};

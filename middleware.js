/*中间件文件*/
const db = require('./models');
// const redis = require('./redis')
const utils = require('./utils')

const rp = require('request-promise');
module.exports = {
  authToken: async function (req, res, next) {
    console.log('middleware');
    next()
  },
}

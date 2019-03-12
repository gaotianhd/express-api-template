const _ = require('lodash');
const rp = require('request-promise');
const bcrypt = require('bcrypt-nodejs');

const AES = require('./aes');
const models = require('../../models');
const SHA256 = require('./sha256');
const redis = require('../../redis');
const utils = require('../../utils');

module.exports = {
  testapi: async function (req, res) {
    console.log('test api');
    return res.json({success: true})
  },
}

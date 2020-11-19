var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new mongoose.Schema({
  name: {
    type: String,
    label: '测试model'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7140,
  }
}, {versionKey: false, collection: 'testmodels'})
module.exports = mongoose.model('testmodels', schema);

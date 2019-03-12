const fs = require('fs');

/**
 * Return a unique identifier with the given `len`.
 *
 *     utils.uid(10);
 *     // => "FDaS435D2z"
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */
exports.uid = function(len) {
  var buf = []
    , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

exports.code = function(len) {
  var buf = []
    , chars = '0123456789'
    , charlen = chars.length;

  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
}

//判断手机号是否正确
exports.isPhone = function (phone) {
  var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (phoneReg.test(phone)) {
   return true;
  } else {
   return false;
  }
}

exports.isJSON = function (str) {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
        return {success: true, msg: obj};
      } else {
        return {success: false, msg: '不是json字符串'};
      }
    } catch (e) {
      return {success: false, msg: 'error：' + str + '!!!' + e};
    }
  }
  return {success: false, msg: '传入类型错误'}
}

/**
 * Return a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

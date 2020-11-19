const OSS = require('ali-oss');
const aliOSSConfig = require('../../config').aliOSSConfig;

const client = new OSS(aliOSSConfig);

/**
 * uploadFile ---- 浏览器直接上传文件至阿里OSS
 * @param params 参数对象
 ** @param files - {Object} - 上传的文件对象组成的对象
 ** @param randomFileName - Boolean (Optional) - 是否自动生成随机文件名
 ** @param path - String (Optional) - 储存目录，以'/'结尾，不以'/'开头。不填则存在根目录
 ** @param sizeLimit - Number (Optional) - 单位Byte
 ** @param sizeLimitDisplay - String (Optional) - 错误提示中的文件大小显示值 - 如'5MB'
 ** @param formats - [String] (Optional, 不填可上传任何文件) - 如 ['audio/mp3','audio/m4a']
 ** @param formatsDisplay - [String] (Optional, 如果有formats，则必填) - 文件后缀，如['mp3','m4a']，用于上传失败后的错误提示
 ** @param success - Function(result <Object>) - 上传成功回调
 ** @param fail - Function(err <Object>) - 上传失败回调
 * @returns {object}
*/

export const uploadFile = async params => {
  params.formats = params.formats || [];
  params.formatsDesc = params.formatsDesc || [];
  params.path = params.path || '';

  const file = params.file;
  if (params.formats.length > 0 && !params.formats.includes(file.type)) {
    return params.fail(
      new Error(`文件格式错误: 必须上传${params.formatsDisplay.toString()}`)
    );
  }
  if (!!params.sizeLimit && file.size > params.sizeLimit) {
    return params.fail(
      new Error(`文件体积过大: 必须不超过${params.sizeLimitDisplay}`)
    );
  }
  const fileName = file.name.split('.')
  const type = fileName.pop();
  const name = params.name || fileName.join('-');
  const newName = name + "_" + new Date().getTime() + "." + type;
  await client.put(params.path + newName, file.path).then((r) => {
    return params.success(r);
  }).catch((e) => {
    return params.fail(e);
  })
}

/**
 * uploadBatchFile ---- 浏览器直接批量上传文件至阿里OSS
 * @param params 参数对象
 ** @param files - {Object} - 上传的文件对象组成的对象
 ** @param randomFileName - Boolean (Optional) - 是否自动生成随机文件名
 ** @param path - String (Optional) - 储存目录，以'/'结尾，不以'/'开头。不填则存在根目录
 ** @param sizeLimit - Number (Optional) - 单位Byte
 ** @param sizeLimitDisplay - String (Optional) - 错误提示中的文件大小显示值 - 如'5MB'
 ** @param formats - [String] (Optional, 不填可上传任何文件) - 如 ['audio/mp3','audio/m4a']
 ** @param formatsDisplay - [String] (Optional, 如果有formats，则必填) - 文件后缀，如['mp3','m4a']，用于上传失败后的错误提示
 ** @param success - Function(result <Object>) - 上传成功回调
 ** @param fail - Function(err <Object>) - 上传失败回调
 * @returns {object}
*/

// export const uploadMultiFile = async params => {
//   params.formats = params.formats || [];
//   params.formatsDesc = params.formatsDesc || [];
//   params.path = params.path || '';
//
//   const files = params.files;
//   if (files.length > 6) {
//     return params.fail(new Error('上传错误: 上传图片数量不能大于6张'));
//   }
//   for (i = 0; i < files.length; i++) {
//     const file = files[i];
//     if (params.formats.length > 0 && !params.formats.includes(file.type)) {
//       return params.fail(
//         new Error(`文件格式错误: 必须上传${params.formatsDisplay.toString()}`)
//       );
//     }
//     if (!!params.sizeLimit && file.size > params.sizeLimit) {
//       return params.fail(
//         new Error(`文件体积过大: 必须不超过${params.sizeLimitDisplay}`)
//       );
//     }
//     await client.put(params.path + file.name,file.path).then((r) => {
//
//     }).catch((e) => {
//
//     })
//   }
// }

/**
 * 删除文件
 * @param name 待删除文件key名
 * @returns {string}
*/

export const deleteFile = async (name) => {
  return new Promise((resolve, reject) => {
    client.delete(name).then((r) => {
      resolve(r);
    }).catch((e) => {
      reject(e)
    })
  });
}

/**
 * 批量删除文件
 * @param params 待删除文件key数组
 * @returns {string}
*/

export const deleteMultiFile = async (params) => {
  return new Promise((resolve, reject) => {
    client.deleteMulti(params).then((r) => {
      resolve(r);
    }).catch((e) => {
      reject(e)
    })
  });
}

/**
 * 获取文件url
 * @param name 文件名
 * @returns {string}
*/

// export const getFileUrl = (name) => {
//   return client.signatureUrl(name, {expires: 300});
// };

/**
 * 修改文件权限
 * @param name 文件名
 * @param power 待修改权限
 * @returns {string}
*/

// export const updateFileACL = async (name, power) => {
//   return new Promise((resolve, reject) => {
//     client.putACL(name, power).then((r) => {
//       resolve(r);
//     }).catch((e) => {
//       reject(e)
//     })
//   });
// }

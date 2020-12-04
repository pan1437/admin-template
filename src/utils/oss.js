/* eslint-disable no-unused-vars */
const OSS = require('ali-oss')

export function client(data) {
  // 后端提供数据
  return new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: 'LTAI4FvGUbVBz33n8V82YkcK',
    accessKeySecret: 'DqYOXfTyAR9RdwQAwL1cuRB4NFA3zC',
    bucket: 'lsyf'
  })
}

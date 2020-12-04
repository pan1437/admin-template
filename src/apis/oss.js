import * as http from '@/utils/commonRequest'

//获取用户列表
export const getOss = parms => http.get('/internal/oss/sts', parms)

// 获取城市
export const getProvinces = params => http.get('/provinces', params)

export const getCities = params =>
  http.get('/provinces/' + params.id + '/cities')

export const getCounties = params =>
  http.get('/cities/' + params.id + '/counties')

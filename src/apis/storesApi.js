import * as http from '@/utils/request'

//药房列表
export const getStores = params => http.get('/stores', params)

//添加药房
export const addStore = data => http.post('/stores', data)

//获取药房详情
export const getStoresDetails = params => http.get('/stores/' + params.id)

//修改药房
export const editStore = params => http.put('/stores/' + params.id, params)

//药房账号列表
export const getAccounts = params => http.get('/store/accounts', params)

//添加药房账号
export const addAccounts = data => http.post('/store/accounts', data)

//修改账号
export const editAccounts = data => http.put('/store/accounts/' + data.id, data)

//删除药房账号
export const removeAccounts = data =>
  http.deleteDate('/store/accounts/' + data.id, data)

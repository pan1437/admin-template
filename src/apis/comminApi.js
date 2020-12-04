import * as http from '@/utils/request'
//通用接口
export const commons = params => http.get('/admin/fe', params)

export const store = params => http.get('/admin/common/stores', params)

//获取角色下拉列表
export const roles = params => http.get('/admin/common/roles', params)

export const region = params => http.get('/region', params)

export default {
  region: params => http.get('/admin/region', params)
}

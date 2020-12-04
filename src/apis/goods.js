import * as http from '@/utils/request'

//获取商品列表
export const goodsList = params => http.get('/admin/goods', params)

export const goodsEdit = (id, params) => http.put('/admin/goods/' + id, params)
export const goodsDetail = (id, params) =>
  http.get('/admin/goods/' + id, params)

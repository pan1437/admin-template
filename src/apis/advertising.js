import * as http from '@/utils/request'

// 广告列表
export const advertisingList = data => http.get('/admin/advertCategory', data)
//配置管理图片
export const getContent = data => http.get('/admin/advertList/' + data)

//添加广告

export const addContent = data => http.post('/admin/advert', data)

//更新广告
export const updatePosition = (id, data) =>
  http.put(`/admin/advert/${id}`, data)

//更新广告
export const delPosition = (id, data) =>
  http.deleteDate(`/admin/advert/${id}`, data)

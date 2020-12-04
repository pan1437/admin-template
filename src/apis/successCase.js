import * as http from '@/utils/request'

//标签列表
export const successcase = params => http.get('/admin/successcase', params)

//标签列表
export const addsuccesscase = params => http.post('/admin/successcase', params)

export const sortSuccesscase = (id, params) =>
  http.put('/admin/successcase/sort/' + id, params)

export const editSuccesscase = (id, params) =>
  http.put('/admin/successcase/' + id, params)

export const delsuccesscase = (id, params) =>
  http.deleteDate('/admin/successcase/' + id, params)

import * as http from '@/utils/request'

const prefix = '/admin/meeting'

export default {
  list: params => http.get(prefix, params),
  detail: id => http.get(`${prefix}/${id}`),
  publish: data => http.post(prefix, data),
  edit: (id, data) => http.put(`${prefix}/${id}`, data),
  delete: id => http.deleteDate(`${prefix}/${id}`),
  attend: params => http.get(`${prefix}/attend`, params), // 报名列表
  status: (id, data) => http.put(`${prefix}/${id}/status`, data), // 设置状态
  sort: (id, data) => http.deleteDate(`${prefix}/${id}/sort`, data) // 排序
}

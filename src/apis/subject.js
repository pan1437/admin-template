import * as http from '@/utils/request'

//标签列表
export const subjectList = params => http.get('/admin/subject', params)

//标签列表
export const addsubject = params => http.post('/admin/subject', params)

export const editsubject = (id, params) =>
  http.put('/admin/subject/' + id, params)

//标签列表
export const subjectDetail = (id, params) =>
  http.get('/admin/subject/' + id, params)

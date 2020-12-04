import * as http from '@/utils/request'

//获取用户列表
export const getCoachList = params => http.get('/admin/coach', params)

export const updataCoachStatus = (id, data) =>
    http.put('/admin/coach/status/' + id, data)

export const addCoach = data => http.post('/admin/coach', data)

export const editCoach = (id, data) => http.put('/admin/coach/' + id, data)

export const delCoach = (id, data) =>
    http.deleteDate('/admin/coach/' + id, data)
export const coachRemark = (id, data) =>
    http.get(`/admin/coach/${id}/comment`, data)

//修改排序值
export const coachSort = (id, data) => http.put(`/admin/coach/${id}/sort`, data)
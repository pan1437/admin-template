import * as http from '@/utils/request'

//医生管理列表
export const getDoctors = params => http.get('/doctors', params)

// 医生详情 /doctors/:doctor_id
export const doctorInfo = params => http.get('/doctors/' + params.id)

//获取待审核列表
export const getDoctorPending = params => http.get('/pending', params)

//审核列表详情

export const getDoctorPendingId = params => http.get('/pending/' + params.id)

//更新审核状态
export const editPending = data => http.put('/pending/' + data.id, data)

//锁定该医生
export const lockDoctor = data => http.put('/doctors/' + data.id, data)

//医生评论列表
export const getDoctorComment = data =>
  http.get('/doctors/' + data.id + '/comment', data)

//展示评论
export const showDoctorComment = data =>
  http.put('/doctors/comment/' + data.id + '/show', data)

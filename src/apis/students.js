import * as http from '@/utils/request'

//获取用户列表
export const getStudentsList = params => http.get('/admin/student', params)

//用户详情
export const getStudentsDetails = id => http.get('/admin/student/' + id)

//安排教练
export const changeStudentCoach = (id, params) =>
    http.put('/admin/student/' + id, params)

//教练列表
export const coachList = () => http.get('/admin/student/coach')
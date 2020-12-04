import * as http from '@/utils/request'
export default {
    indexData: () => http.get('/admin/index'),
    serviceChart: params => http.get('/admin/index/agent', params), // 服务中心走势图
    studentChart: params => http.get('/admin/index/student', params) // 学员走势图
}
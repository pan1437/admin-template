import * as http from '@/utils/request'

export default {
    getpartner: params => http.get('/admin/partner', params), //合伙人列表
    getuser: params => http.get('/admin/partner/user', params), //用户列表
    addpartner: (id, data) => http.put(`/admin/partner/${id}/join`, data), //添加合伙人

    cancelpartner: id => http.put(`/admin/partner/${id}/cancel`), //取消
    getamount: data => http.get('/admin/partner/amount', data), //业绩
    partnerName: (id, data) => http.put(`/admin/partner/${id}/name`, data) //编辑合伙人名称
}
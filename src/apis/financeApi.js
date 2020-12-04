import * as http from '@/utils/request'

export default {
    agentList: params => http.get('/admin/orderagent', params), // 加盟费列表
    agentDetail: id => http.get(`/admin/orderagent/${id}`), // 加盟费审核详情
    agentAudit: (id, data) => http.put(`/admin/orderagent/finance/${id}`, data), // 加盟费财务审核

    adviserList: params => http.get('/admin/orderadviser', params), // 服务顾问加盟费列表
    adviserDetail: id => http.get(`/admin/orderadviser/${id}`), // 服务顾问加盟费详情
    adviserAudit: (id, data) => http.put(`/admin/adviser/finance/${id}`, data), // 服务顾问加盟财务审核

    registeryList: params => http.get('/admin/ordergoods', params), // 报名费列表
    registeryDetail: id => http.get(`/admin/ordergoods/${id}`), // 报名费详情
    registeryAudit: (id, data) => http.put(`/admin/financegoods/${id}`, data), // 报名费财务审核

    withdrawList: params => http.get('/admin/withdrawal', params), // 提现列表
    withdrawDetail: id => http.get(`/admin/withdrawal/${id}`), // 提现详情
    withdrawProfit: data => http.get('/admin/withdrawal/balance', data), // 关联收益

    withdrawAudit: (id, data) => http.put(`/admin/withdrawal/${id}/status`, data), // 提现审批
    offlinePay: (id, data) =>
        http.post(`/admin/withdrawal/${id}/offline_pay`, data), // 已向该用户线下打款

    orderRecords: params => http.get('/admin/transaction', params), // 订单记录
    profitlog: (type, params) => http.get(`/admin/profitlog/${type}`, params), // 分润记录

    arrears: params => http.get('/admin/CreditManagement', params), // 赊账列表
    repayment: (id, data) => http.put(`/admin/repayment/${id}`, data), // 还款
    repaymentRecord: id => http.get(`/admin/creditmanagement/record/${id}`), // 还款记录
    orderbalance: data => http.get('/admin/orderbalance', data), // 还款
    profitDetails: id => http.get('/admin/profitlog/change', id), //分润明细
    repaymentDetails: data => http.get('/admin/creditmanagement/repayment', data) //还款明细
}
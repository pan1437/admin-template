import * as http from '@/utils/request'

export const income = data => http.get('/admin/report/income', data) // 汇总收支报表
export const incomeDetail = data => http.get('/admin/report/incomeDetail', data) // 汇总收支明细
export const incomeDetailCount = data =>
    http.get('/admin/report/incomeDetailCount', data) //汇总收入
    //
export const incomePay = data => http.get('/admin/report/incomePay', data) // 汇总收支报表
export const incomePayCount = data =>
    http.get('/admin/report/incomePayCount', data) // 汇总收支报表

export const incomePayDetail = data =>
    http.get('/admin/report/incomePayDetail', data) // 汇总收支帐户明细报表--查看明细
export const incomePayDetailCount = data =>
    http.get('/admin/report/incomePayDetailCount', data) // 汇总收支报表
    //
export const adviserList = data => http.get('/admin/report/adviser', data) // 服务顾问明细
export const getAccountTotal = data =>
    http.get('/admin/report/adviserCount', data) //汇总金额

export const financeCenter = data => http.get('/admin/report/agentQuota', data) //财务中心名额

export const serverCenter = data => http.get('/admin/report/agent', data) //服务中心返佣明细
export const serverCenterAccount = data =>
    http.get('/admin/report/agentCount', data) //服务中心返佣汇总

export const partnerReport = data => http.get('/admin/report/partner', data) //事业合伙人列表

export const partnerCount = data => http.get('/admin/report/partnerCount', data) //事业合伙人汇总
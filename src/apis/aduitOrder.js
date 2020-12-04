import * as http from '@/utils/request'

//获取订单列表
export const ordergoodsList = params => http.get('/admin/ordergoods', params)

//用户详情
export const getUserDetails = id => http.get('/admin/user/' + id)

//用户状态修改
export const updataUserStatus = (id, data) =>
    http.put('/admin/user/' + id, data)

//名额
export const quotaList = params => http.get('/admin/quota', params)
    //名额转让审核
export const userquotaAudit = (id, data) => http.put('/admin/quota/' + id, data)

//订单管理员审核
export const admingoodsAudit = (id, data) =>
    http.put('/admin/admingoods/' + id, data)

//服务中心管理员审核
export const orderagentAudit = (id, data) =>
    http.put('/admin/orderagent/admin/' + id, data)

//服务顾问管理员审核
export const adviserAudit = (id, data) =>
    http.put('/admin/adviser/admin/' + id, data)

//修改名额
export const userquota = (id, data) => http.put('/admin/userquota/' + id, data)

//服务中心订单
export const orderagentList = params => http.get('/admin/orderagent', params)

//服务顾问订单
export const orderadviser = params => http.get('/admin/orderadviser', params)

//获取下辖学员
export const orderagentDetail = (id, data) =>
    http.get('/admin/orderagent/' + id, data)

export const ordergoodsDetail = (id, data) =>
    http.get('/admin/ordergoods/' + id, data)

export const orderadviserDetail = (id, data) =>
    http.get('/admin/orderadviser/' + id, data)

export const answerDetail = (id, data) => http.get('/admin/answer/' + id, data)

//名额记录列表
export const quotaRecord = (id, params) =>
    http.get(`/admin/user/${id}/quota`, params)

// 护眸天使订单撤单
export const orderCancel = (id, params) =>
    http.put(`/admin/ordergoods/${id}/cancel`, params)

// 服务中心订单撤单
export const serviceCenterCancel = (id, params) =>
    http.put(`/admin/orderagent/${id}/cancel`, params)

export const applyImage = (id, data) =>
    http.put(`/admin/orderagent/${id}/applyImage`, data)

export const applyIdcard = (id, data) =>
    http.put(`/admin/orderagent/${id}/idcard`, data)

//变更记录
export const agentLog = id => http.get(`/order/agent/${id}/region/log`)

export const amountLog = data =>
    http.get('/admin/orderagent/discount_amount/log', data)
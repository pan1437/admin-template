import * as http from '@/utils/request'

//获取用户列表
export const getUserList = params => http.get('/admin/user', params)

//用户详情
export const getUserDetails = id => http.get('/admin/user/' + id)

//用户状态修改
export const updataUserStatus = (id, data) =>
    http.put('/admin/user/' + id, data)
    //变更用户等级
export const updataUserlevel = (id, data) =>
    http.put('/admin/userlevel/' + id, data)

//取消用户等级
export const cancelUserlevel = (id, data) =>
    http.deleteDate('/admin/userlevel/' + id, data)
    //修改名额
export const userquota = (id, data) => http.put('/admin/userquota/' + id, data)

// 修改身份证号码
export const idNumber = (id, data) =>
    http.put(`/admin/user/${id}/idNumber`, data)

//获取代理商列表
export const getAgentList = params => http.get('/admin/agent', params)

//修改名额
export const agentbalance = (id, data) =>
    http.get('/admin/agentbalance/' + id, data)

//获取下级代理

export const agentsubordinate = (id, data) =>
    http.get('/admin/agentsubordinate/' + id, data)
    //获取下辖学员
export const agentstudent = (id, data) =>
    http.get('/admin/agentstudent/' + id, data)

//省运营中心

export const regionprovinces = data => http.get('/admin/regionprovinces', data)

//事业部管理

export const division = data => http.get('/admin/division', data)

export const userquotaLog = id => http.get('/admin/userquota/' + id)

//修改负责人名称
export const editManager = (id, data) =>
    http.put(`/admin/agent/${id}/manager`, data)
    //事业部列表
export const partnerList = () => http.get('/admin/user/partner')

//事业部修改
export const revisePartner = (id, data) =>
    http.put(`/admin/agent/${id}/partner`, data)

//名额明细
export const financialDetails = (id, data) =>
    http.get(`/admin/agentQuota/${id}`, data)

//直推下级
export const inviterList = (id, data) =>
    http.get(`/admin/agent/inviterList/${id}`, data)

//修改服务区域
export const reviseArea = (id, data) => http.put(`/admin/user/${id}/pre`, data)

//物资配送列表
export const material = data => http.get('/admin/orderMaterial', data)

//物资详情
export const materialDetail = id => http.get(`/admin/orderMaterial/${id}`)

//修改发货数量
export const sendNumber = (id, data) =>
    http.put(`/admin/logistics/${id}/num`, data)

//修改地址
export const reviseAddress = (id, data) =>
    http.put(`/admin/orderMaterial/${id}/receive`, data)

//取消
export const materialCancel = (id, data) =>
    http.put(`/admin/orderMaterial/${id}/cancel`, data)

//发货
export const delivery = (id, data) =>
    http.post(`/admin/orderMaterial/${id}/delivery`, data)

//删除区域
export const deleteArea = id => http.deleteDate(`/admin/user/${id}/pre`)

//推荐人
export const reviseLog = data => http.get('/admin/user/pidLog', data)

//修改推荐人
export const reviseRecommender = (id, data) =>
    http.put(`/admin/user/${id}/pid`, data)

//修改代理区域
export const reviseAgentArea = (id, data) =>
    http.put(`/admin/agent/${id}/region`, data)

export const agentLog = data => http.get('/admin/agent/log', data)

export const applyImage = (id, data) =>
    http.put(`/admin/agent/${id}/applyImage`, data)

export const declineHandle = id => http.put(`/admin/agent/${id}/cancel`)

export const cancelAgentLog = data =>
    http.get('/admin/agent/cancelAgentLog', data)

export const discount_amount = (id, data) =>
    http.put(`/admin/orderagent/${id}/discount_amount`, data)
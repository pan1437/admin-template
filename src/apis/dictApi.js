/*
 * @Author: your name
 * @Date: 2020-04-27 14:34:07
 * @LastEditTime: 2020-04-27 17:00:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \lsyl-admin\src\apis\dictApi.js
 */
import * as http from '@/utils/request'

//获取全部字典
export const getDict = params => http.get('/admin/dicts', params)

//获取字典
export const getDictList = params => http.get('/admin/dicts/' + params.id)

//添加字典名称
export const addDictList = data => http.post('/admin/dicts', data)

//编辑字典名称
export const editDictList = data => http.put('/admin/dicts/' + data.id, data)

//删除指定字典
export const removeDict = params => http.deleteDate('/admin/dicts/' + params.id)

//编辑字典（置顶sort）
export const editDictsort = data =>
    http.put('/admin/dicts/' + data.id + '/sort', data)

//字典类型
export const categories = () => http.get('/categories')

//添加字典内容   dict_id
export const addDict = data => http.post('/items/' + data.id, data)

//编辑字典内容 id
export const editDict = data => http.put('/items/' + data.id, data)

//删除指定字典内容
export const removeDictContent = data => http.deleteDate('/items/' + data.id)

//获取协议
export const getAgreement = data => http.get('/admin/agreement/' + data.id)

//获取协议类型
export const getAgreementType = data => http.get('/admin/agreement/type', data)

//保存协议
export const editAgreement = data => http.post('/admin/agreement', data)

//配置列表
export const getConfig = parms => http.get('/admin/config', parms)

//新增配置
export const addConfig = data => http.post('/admin/config', data)

//修改配置
export const editConfig = data => http.put('/admin/config/' + data.id, data)
    //删除 配置
export const removeConfig = data => http.deleteDate('/admin/config/' + data.id)

//获取配置详情
export const getConfigInfo = parms =>
    http.get('/admin/config/' + parms.id, parms)

export const attractinvestment = (id, parms) =>
    http.get('/admin/attractinvestment/' + id, parms)

export const editAttractinvestment = (id, parms) =>
    http.put('/admin/attractinvestment/' + id, parms)

export const profit = (id, parms) => http.get('/admin/profit/' + id, parms)

export const profitEdit = (id, parms) => http.put('/admin/profit/' + id, parms)
    //城市管理
export const getCityList = parms => http.get('/admin/region', parms)

//添加城市
export const addCity = (id, parms) =>
    http.put(`/admin/region/${id}/setattr`, parms)

//添加城市
export const cityAdd = parms => http.post('/admin/region', parms)
    //修改城市
export const cityEdit = (id, parms) => http.put(`/admin/region/${id}`, parms)
    //删除城市
export const citydelete = (id, parms) =>
    http.deleteDate(`/admin/region/${id}`, parms)

//获取城市信息
export const cityInfo = (id, parms) => http.get(`/admin/region/${id}`, parms)

//客服列表
export const customerList = parms => http.get('/admin/customer', parms)

//添加客服

export const addCustomer = data => http.post('/admin/customer', data)
export const editCustomer = (id, data) =>
    http.put('/admin/customer/' + id, data)

//新增配置物资信息
export const materialsConfig = data => http.post('/admin/materials', data)

//查询配置物资信息
export const materialInformation = () => http.get('/admin/materials')

//视力测试列表
export const eyeList = () => http.get('/admin/eyesight')

//禁用  //启用
export const eyeStatus = (id, data) =>
    http.put(`/admin/eyesight/${id}/status`, data)

//删除
export const deleteEdition = id => http.deleteDate('/admin/eyesight/' + id)

//编辑
export const editEyesight = (id, data) =>
    http.put(`/admin/eyesight/${id}`, data)

//新增
export const addEyesight = data => http.post('/admin/eyesight', data)
    // export const addEyesight = data =>
    //     http.instance({
    //         url: '/admin/eyesight',
    //         method: 'post',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //         },
    //         data
    //     })

//保留 取消保留
export const reviseRetain = (id, data) =>
    http.put(`/admin/region/${id}/retain`, data)
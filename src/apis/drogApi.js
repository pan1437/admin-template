import * as http from '@/utils/request'

//获取药材类型列表
export const getTypeDrog = (params) => http.get('/types', params)

//编辑药材类型
export const editTypeDrog = (params) => http.put('/types/'+params.id, params)

//添加药材类型
export const addTypeDrog = (data) => http.post('/types', data)

//删除药材类型

export const removeTypeDrog = (data) => http.deleteDate('/types/'+data.id)

//获取药材列表
export const getMaterial = (params) => http.get('/types/'+params.id+'/material',params)


// 获取指定药材 
export const mateials = (params) => http.get('/mateials/'+params.id) 

//添加药材
export const addMateials = (data) => http.post('/mateials',data) 

//编辑药材 
export const editMateials = (data) => http.put('/mateials/'+data.id,data) 


//删除药材
export const removeMateials = (data) => http.deleteDate('/mateials/'+data.id) 


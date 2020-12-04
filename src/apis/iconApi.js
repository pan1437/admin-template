import * as http from '@/utils/request'

//获取图标
export const getIcon = () => http.get('/admin/icon')

//删除图标
export const deleteIcons = data => http.deleteDate('/admin/icon/' + data)

//修改图标
export const editIcons = data => http.put('/admin/icon/' + data.id, data)

//添加图标
export const addIcons = data => http.post('/admin/icon', data)

export const upload = data =>
  http.uploadFile('/admin/uploads', data, {
    'Content-Type': 'multipart/form-data'
  })

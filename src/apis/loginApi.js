import * as http from '@/utils/request'

// 验证码
export const captcha = params => http.get('/admin/captcha', params)

// 登录
export const sessionLogin = data => http.post('/admin/session', data)

// 登录进来读取菜单
export const commonMenus = data => http.get('/admin/common/menus', data)

// 获取菜单
export const menus = data => http.get('/admin/menus', data)

// 添加菜单
export const addMenus = data => http.post('/admin/menus', data)

// 删除菜单

export const deleteMenus = data => http.deleteDate('/admin/menus/' + data)

// 修改菜单
export const editMenu = data => http.put('/admin/menus/' + data.id, data)

// 退出
export const logout = data => http.deleteDate('/admin/session', data)

// 角色 列表
export const getRoles = params => http.get('/admin/roles', params)

// 添加角色
export const addRoles = data => http.post('/admin/roles', data)

// 修改角色
export const editRoles = data => http.put('/admin/roles/' + data.id, data)

// 删除角色
export const removeRoles = data => http.deleteDate('/admin/roles/' + data)

// 管理员列表
export const getAdmins = params => http.get('/admin/admins', params)

// 新增管理员
export const addAdmins = data => http.post('/admin/admins', data)

// 修改管理员
export const editAdmins = data => http.put('/admin/admins/' + data.id, data)

// 删除管理员
export const removeAdmins = data => http.deleteDate('/admin/admins/' + data)
//获取管理员详情

export const getAdminsId = data => http.get('/admin/admins/' + data.id, data)
// 获取角色详情
export const getRolesList = data => http.get('/admin/roles/' + data.id, data)

// 获取角色权限
export const getRolesMenu = params =>
  http.get('/admin/roles/' + params.id + '/menus', params)

// 添加角色权限
export const addRolesMenu = data =>
  http.post('/admin/roles/' + data.id + '/menus', data)

// 首页
export const index = data => http.get('/index', data)

//修改密码

export const updatePsd = data => http.post('/admin/admins/alter', data)

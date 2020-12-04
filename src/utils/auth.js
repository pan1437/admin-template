import _import from '@/router/_import'
import Layout from '@/layout'

const TokenKey = 'token'
const Dictionary = 'dictionary'
const Menu = 'menu'
const Role = 'role'
const Routes = 'routes'
const AddRoutes = 'addRoutes'
const DefaultImg = 'defaultImg'
const userID = 'userID'

function clear() {
    localStorage.removeItem(Role) //删除角色
    localStorage.removeItem(Dictionary) // 删除字典
    localStorage.removeItem(Menu) //删除菜单
    localStorage.removeItem(Routes) //删除路由
    localStorage.removeItem(userID) //删除用户
    localStorage.removeItem(DefaultImg) //删除头像
}
//Token
export function getToken() {
    return localStorage.getItem(TokenKey)
}
export function setToken(token) {
    return localStorage.setItem(TokenKey, token)
}
export function removeToken() {
    clear()
    return localStorage.removeItem(TokenKey)
}
//菜单
export function getMenu() {
    return JSON.parse(localStorage.getItem(Menu)) || []
}
export function setMenu(menu) {
    return localStorage.setItem(Menu, menu)
}
export function removeMenu() {
    clear()
    return localStorage.removeItem(Menu)
}
//Routes
export function getRoutes() {
    return JSON.parse(localStorage.getItem(Routes)) || []
}
export function setRoutes(menu) {
    return localStorage.setItem(Routes, menu)
}
export function removeRoutes() {
    clear()
    return localStorage.removeItem(Routes)
}
//AddRoutes
export function getAddRoutes() {
    return JSON.parse(localStorage.getItem(AddRoutes)) || []
}
export function setAddRoutes(menu) {
    return localStorage.setItem(AddRoutes, menu)
}
export function removeAddRoutes() {
    clear()
    return localStorage.removeItem(AddRoutes)
}
//头像
export function getDefaultImg() {
    return JSON.parse(localStorage.getItem(DefaultImg))
}
export function setDefaultImg(menu) {
    return localStorage.setItem(DefaultImg, JSON.stringify(menu))
}
export function removeDefaultImg() {
    clear()
    return localStorage.removeItem(DefaultImg)
}
//角色
export function getRole() {
    return JSON.parse(localStorage.getItem(Role)) || []
}
export function setRole(role) {
    return localStorage.setItem(Role, role)
}
export function removeRole() {
    clear()
    return localStorage.removeItem(Role)
}
//字典
export function setDictionary(dictionary) {
    return localStorage.setItem(Dictionary, JSON.stringify(dictionary))
}
export function removeDictionary() {
    clear()
    return localStorage.removeItem(Dictionary)
}
export function getDictionary() {
    return JSON.parse(localStorage.getItem(Dictionary))
}

//用户详情的患者id
export function getUserID() {
    return localStorage.getItem(userID)
}
export function setUserID(id) {
    return localStorage.setItem(userID, id)
}
export function removeUserID() {
    return localStorage.removeItem(userID)
}
export let roles = []
export function getTree(arr) {
    let key = 'children'
    let newarr = []
    arr.forEach(function(item) {
        if (getRole().length === 0) {
            if (item.url === 'article/:id/manage') {
                roles.push('removeArtEditor') //主编删除
            }
            if (item.url === 'article/:id') {
                roles.push('removeArt') //普通删除
            }
            if (item.url === 'article/:id/status') {
                roles.push('approver') //主编审批文章
            }
            if (item.url === 'article/:id/manage') {
                roles.push('editEditor') //主编编辑权限
            }
            if (item.url === 'article/manage') {
                roles.push('newEditor') //主编新增文章
            }
            if (item.url === 'article/:id/top_sort') {
                roles.push('top_sort') //首页推荐值
            }
            if (item.url === 'article/:id/sort') {
                roles.push('sort') //栏目推荐值
            }
            if (item.url === 'article/:id/top') {
                roles.push('top') //置顶
            }
            if (item.url === 'article/:id/status') {
                roles.push('approver') //主编审批文章
            }
            if (item.url === 'article/:id/online') {
                roles.push('online') //文章上下线
            }
        }
        let meta = {
            icon: item.icon,
            status: ''
        }
        let path = JSON.parse(JSON.stringify(item.component))
        let name = JSON.parse(JSON.stringify(item.name))
            //component 是菜单必须的参数
        if (item.component != '') {
            newarr.push(item)
        }
        meta.title = name
        item.name = item.component
        item.meta = meta
        item.menu == 1 ? (item.hidden = false) : (item.hidden = true)
        item.pid == 0 && item.name != 'index' ?
            (item.path = '/' + path) :
            (item.path = path)
        if (item.pid == 0) {
            // eslint-disable-next-line no-useless-escape
            item.redirect = item.redirect.replace(/\ +/g, '')
            item.component = Layout
                // if (item.name == 'index') {
                //   item.path = '/'
                //   item.name = 'dashboard'
                //   item.children = [
                //     {
                //       path: 'dashboard',
                //       name: 'dashboard1',
                //       component: () => import('@/views/dashboard/index'),
                //       meta: { title: '首页', icon: 'dashboard' }
                //     }
                //   ]
                // }
        } else {
            item.component = _import(item.component)
            delete item.redirect
        }
        if (item.status == 0) {
            item.hidden = true
        }
        if (item.sub_menu && Array.isArray(item.sub_menu)) {
            item[key] = getTree(item.sub_menu)
            delete item.sub_menu
        }
    })
    return newarr
}
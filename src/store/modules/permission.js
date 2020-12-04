/* eslint-disable no-unused-vars */
import { constantRouterMap } from '@/router'
import { commonMenus } from '@/apis/loginApi'

// const _import = require('@/router/_import_' + process.env.NODE_ENV) // 获取组件的方法
import {
  setRole,
  getTree,
  roles,
  getRole,
  setMenu,
  getMenu,
  getAddRoutes,
  getRoutes,
  setAddRoutes,
  setRoutes
} from '@/utils/auth'
import _import from '@/router/_import'
import Layout from '@/layout'

const state = {
  routes: [],
  addRoutes: []
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRouterMap.concat(routes)
  },
  ROMOVE_MENU: (state, routes) => {
    state.addRoutes = []
    state.routes = constantRouterMap
    // localStorage.setItem('router', [])
  }
}
// eslint-disable-next-line no-unused-vars
const actions = {
  generateRoutes({ commit }, router) {
    return new Promise((resolve, reject) => {
      if (getRoutes().length == 0) {
        commonMenus()
          .then(res => {
            if (res.status == 200) {
              if (res.data[0].component == 'index') {
                res.data[0].redirect = res.data[1].redirect
              }
              setRoutes(JSON.stringify(res)) //作为路由匹配

              const menu = getTree(res.data)
              console.log(menu)
              commit('SET_ROUTES', menu)
              if (getRole().length == 0) {
                // localStorage.setItem('role',JSON.stringify(roles))
                setRole(JSON.stringify([...new Set(roles)]))
              }
              // localStorage.setItem('menu',JSON.stringify(menu))
            }
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      } else {
        const menu = getTree(getRoutes().data)
        if (getRole().length == 0) {
          // localStorage.setItem('role',JSON.stringify(roles))
          setRole(JSON.stringify([...new Set(roles)]))
        }
        commit('SET_ROUTES', menu)
        resolve(getRoutes())
      }
    })
  },
  removeRouter({ commit }, router) {
    return new Promise((resolve, reject) => {
      commit('ROMOVE_MENU')
      resolve(true)
    }).catch(error => {
      // eslint-disable-next-line no-undef
      reject(error)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

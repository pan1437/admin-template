/* eslint-disable no-unused-vars */
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken,
  getMenu,
  getDictionary,
  setDictionary,
  getRole
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
// import { stringify } from 'qs'
import { commons } from '@/apis/comminApi'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()

  if (hasToken) {
    if (!getDictionary()) {
      commons().then(res => {
        setDictionary(res.data)
      })
    }
    try {
      if (store.getters.permission_addRoutes.length == 0) {
        await store
          .dispatch('permission/generateRoutes')
          .then(res => {
            if (res.status == 200) {
              const menu = store.getters.permission_routes
              router.options.routes = menu
              router.addRoutes(menu)
              router.addRoutes([
                {
                  path: '/404',
                  component: () => import('@/views/404'),
                  hidden: true
                },
                { path: '*', redirect: '/404', hidden: true }
              ])

              if (to.path == '/index' || to.path == '/') {
                next({
                  path: menu[1].redirect
                })
              } else {
                next({
                  ...to
                })
              }
              // next({ ...to, replace: true })
              NProgress.done()
            } else {
              if (to.path == '/login') {
                next()
              } else {
                next({
                  path: '/login',
                  query: { redirect: to.fullPath }
                })
                store.dispatch('user/resetToken')
              }
            }
          })
          .catch(() => {
            // eslint-disable-next-line no-undef
            Message.error(error || '请重新登录')
            setTimeout(() => {
              next(`/login?redirect=${to.path}`)
              location.reload()
            }, 2000)
            NProgress.done()
          })
      } else {
        next()
      }
    } catch (error) {
      // remove token and go to login page to re-login
      await store.dispatch('user/resetToken')
      Message.error(error || 'Has Error')
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  } else {
    store.dispatch('user/resetToken')
    if (to.path === '/login') {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
    NProgress.done()
  }
  /* 如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if (to.path == '/login') {
    if (hasToken) {
      next('/')
      NProgress.done()
    } else {
      next()
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

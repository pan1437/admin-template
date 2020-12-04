/* eslint-disable no-unused-vars */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import QS from 'qs'
import router from '@/router'

function getBaseURLFoo() {
  axios.defaults.baseURL = process.env.VUE_APP_General_API
}
// 请求超时时间
axios.defaults.timeout = 20000
// post请求头
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.withCredentials = true
// request interceptor
axios.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    config.headers['Authorization'] = localStorage.getItem('token')
    config.headers['code'] = localStorage.getItem('code')
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
axios.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if (response.status == 200) {
      return response
    }
  },
  error => {
    console.log(error, error.data, error.response, 'commonRequest')
    if (!error.response) {
      Message({
        message: error,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
    console.log(error, error.data, 'commonRequest2')
    if (error.response.status == 401) {
      //token 失效   400 请求失败 500服务器错误
      store.dispatch('user/resetToken').then(() => {
        console.log(localStorage.getItem('token'), '出现错误删除了token')
        setTimeout(() => {
          location.reload()
        }, 1000)
        store.dispatch('permission/removeRouter')
      })
    }
    Message({
      message: error.response.data.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error.response.data.msg)
  }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  const token = localStorage.getItem('token')
  // if (token) {
  //     params['token'] = localStorage.getItem('token')
  // }
  getBaseURLFoo()
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        // store.commit('SET_LOADING', false)
        resolve(res)
      })
      .catch(err => {
        // store.commit('SET_LOADING', false)
        reject(err)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} data  [请求时携带的参数]
 */

export function post(url, data) {
  getBaseURLFoo()

  // data['token'] = localStorage.getItem('token')
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(data))
      .then(res => {
        // store.commit('SET_LOADING', false)
        resolve(res)
      })
      .catch(err => {
        // store.commit('SET_LOADING', false)
        reject(err)
      })
  })
}
export function deleteDate(url, data) {
  getBaseURLFoo()

  // data['token'] = localStorage.getItem('token')
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(res => {
        // store.commit('SET_LOADING', false)
        resolve(res)
      })
      .catch(err => {
        // store.commit('SET_LOADING', false)
        reject(err)
      })
  })
}
export function put(url, data = {}) {
  getBaseURLFoo()
  return new Promise((resolve, reject) => {
    axios
      .put(url, data)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

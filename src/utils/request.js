/* eslint-disable no-unused-vars */
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import QS from 'qs'
import MD5 from 'md5'

export const instance = axios.create()
instance.defaults.baseURL = process.env.VUE_APP_BASE_API

// 请求超时时间
instance.defaults.timeout = 20000
    // post请求头
instance.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded;charset=UTF-8'
instance.defaults.withCredentials = true
    // request interceptor
instance.interceptors.request.use(
    config => {
        store.dispatch('app/loading', true)

        // do something before request is sent
        if (store.getters.token) {
            // let each request carry token
            // ['token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['token'] = getToken()
        }
        config.headers['token'] = localStorage.getItem('token')
        config.headers['code'] = localStorage.getItem('code')
        return config
    },
    error => {
        store.dispatch('app/loading', false)
            // do something with request error
        return Promise.reject(error)
    }
)

// response interceptor
instance.interceptors.response.use(
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
        store.dispatch('app/loading', false)
        if (response.status == 200) {
            return response
        }
    },
    error => {
        store.dispatch('app/loading', false)
        if (!error.response) {
            Message({
                message: error,
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(error)
        }
        if (error.response.status == 401) {
            // token 失效   400 请求失败 500服务器错误
            store.dispatch('user/resetToken').then(() => {
                console.log(localStorage.getItem('token'), '出现错误删除了token')
                setTimeout(() => {
                    location.reload()
                }, 1000)
                store.dispatch('permission/removeRouter')
            })
        }
        if (error.response.status == 413) {
            // 413图片大小太大
            Message({
                message: '图片大小太大',
                type: 'error',
                offset: 30,
                duration: 5 * 1000
            })
            return Promise.reject(error.response)
        }
        Message({
            message: error.response.data.msg || error.response.data,
            type: 'error',
            offset: 30,
            duration: 5 * 1000
        })
        console.log(error.response)
        return Promise.reject(error.response)
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
    return new Promise((resolve, reject) => {
        instance
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
    // data['token'] = localStorage.getItem('token')
    return new Promise((resolve, reject) => {
        const date = data
        if (date.id) {
            delete date.id
        }
        instance
            .post(url, QS.stringify(date))
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
    // data['token'] = localStorage.getItem('token')
    return new Promise((resolve, reject) => {
        instance
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
    return new Promise((resolve, reject) => {
        const date = data
        if (date.id) {
            delete date.id
        }
        instance
            .put(url, date)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 封装上传文件请求
 * @param {请求地址} url
 * @param {请求参数} data
 */
export function uploadFile(url, data = {}, headers = {}) {
    return new Promise((resolve, reject) => {
        instance
            .request({
                url: url,
                method: 'post',
                headers,
                data: data
            })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}
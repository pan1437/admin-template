/* eslint-disable no-unused-vars */
// import Cookies from 'js-cookie'
import {
  getToken,
  setToken,
  removeToken,
  setDictionary,
  removeDictionary
} from '@/utils/auth'
import { resetRouter } from '@/router'
import { sessionLogin, logout } from '@/apis/loginApi'

import { commons } from '@/apis/comminApi'
const state = {
  token: getToken(),
  code: localStorage.getItem('code') || '',
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, captcha } = userInfo
    const parm = {
      username: username.trim(),
      password: password,
      captcha: captcha.trim()
    }
    return new Promise((resolve, reject) => {
      sessionLogin(parm)
        .then(response => {
          const { data } = response
          setToken(data.token)

          commit('SET_TOKEN', data.token)

          commons().then(res => {
            setDictionary(res.data)
          })

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  // eslint-disable-next-line no-unused-vars
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(res => {
          if (res.status == 200) {
            commit('SET_TOKEN', false)
            removeDictionary()
            removeToken()
            resetRouter()
          }
          resolve(res)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', false)
      removeDictionary()
      removeToken()
      resetRouter()
      resolve(true)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

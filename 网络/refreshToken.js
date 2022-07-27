/**
 refresh token是在Access_token过期后 去重新请求/refreshAPI 获取新的Access _token 以此循环重复 保持用户的登录状态

refresh token 

​	有过期时间  过了这个时间 就是真正的过期了

​    有了refresh token 用户就可以不赢登录 而去刷新Access_token

refresh token 的实现技术难点

1. 当Access token失效后 假设当前用户同时发起了多个请求,该如何处理了
   1. 可能存在的情况:
      1. 多个请求都去调用刷新token的接口,带宽浪费
 */

import Cookies from 'js-cookie'
import axios from 'axios'

const Token_key = 'access_token'
const Refresh_token = 'refresh_token'

const isRefreshing = false //是否刷新token的标志
const Requests = [] // 保存token失效后 同时发送的多个请求

export const getToken = () => Cookies.get(Token_key)
export const setToken = (token, params = {}) =>
  Cookies.set(Token_key, token, params)
export const setRefreshToken = token => {
  Cookies.set(Refresh_token, token)
}
export const getRefreshToken = () => Cookies.get(Refresh_token)
const refreshTokenRequest = () => {
  return axios.post('/auth/refresh', { refresh_token: getRefreshToken() }, true)
}
// 那些方法需要Access token 则调用该方法
const setHeaderToken = isNeedToken => {
  const accessToken = isNeedToken ? getToken() : null
  if (isNeedToken) {
    if (!accessToken) console.log('access token 不存在,')
    return
  }
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
}
axios.interceptors.response.use(
  () => {
    return response
  },
  error => {
    if (!error.response) {
      return Promise.reject(error)
    }
    const { response, config } = error
    // 假设当前用户发送了3个请求 这个3个请求的状态都是401, 那应该不会走到else分支判断里面吧
    // /auth/refresh 是refresh_token没过期时,刷新Access_token的凭证,但是refresh token过期的状态码也是 401 如果不加这个判断 用户的登录状态会是一直有效
    if (response.status === 401 && !config.url.includes('/auth/refresh')) {
      if (!isRefreshing) {
        isRefreshing = true
        refreshTokenRequest()
          .then(res => {
            const { access_token } = res.data
            setToken(access_token)
            config.headers.Authorization = `Bearer ${access_token}`
            Requests.forEach(cb => cb(access_token))
            return axios(config)
          })
          .catch(err => {
            console.log(' 登录状态已失效, 请重新登录! ')
            return Promise.reject(err)
          })
          .finally(() => {
            isRefreshing = false
          })
      }
    } else {
      return new Promise(resolve => {
        Requests.push(token => {
          config.headers.Authorization = `Bearer ${token}`
          resolve(axios(config))
        })
      })
    }
    return Promise.reject(error)
  }
)

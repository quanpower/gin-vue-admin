import axios from 'axios'
import { getToken, removeToken } from '@/libs/auth'

const AUTH_TOKEN = getToken()

var instance = axios.create({
})
instance.defaults.headers.common.Authorization = AUTH_TOKEN

instance.interceptors.request.use(function (config) {
  const url = config.url
  config.headers.Authorization = ''

  if (url.indexOf('login') > -1) {
    localStorage.setItem('smart-link-admin-token', '')
  }

  if (url.indexOf('user') > -1 && url.indexOf('login') < 0) {
    config.headers.Authorization = localStorage.getItem('smart-link-admin-token')
  }

  return config
}, function (err) {
  return Promise.reject(err)
})

instance.interceptors.response.use(function (res) {
  if (res.headers.token) {
    localStorage.setItem('token', res.headers.token)
  }
  return res
}, function (err) {
  return err
})
export default instance

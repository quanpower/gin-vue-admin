import request from '@/libs/request'
import qs from 'qs'


export function loginByEmail(payload) {
  return request({
    url: '/admin/auth/login/access-token',
    method: 'post',
    data: payload
  })
}


export function loginByUsername (username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/auth/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function logout () {
  return request({
    url: '/auth/logout',
    method: 'post',
    loading: 'hourglass'
  })
}



export function getUserInfo() {
  return request({
    url: '/admin/auth/user/info',
    method: 'get',
  })
}

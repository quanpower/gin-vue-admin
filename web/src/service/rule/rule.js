import request from '@/libs/request'

export function getRules () {
  return request({
    url: '/api/v1/poka/rule',
    method: 'get',
  })
}


export function createRule (payload) {
  return request({
    url: '/api/v1/poka/rule',
    method: 'post',
    data: payload
  })
}


export function updateRule (payload) {
  return request({
    url: '/api/v1/poka/rule',
    method: 'put',
    data: payload
  })
}

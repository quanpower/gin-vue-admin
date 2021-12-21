import request from '@/libs/request'

export function getModels () {
  return request({
    url: '/api/v1/poka/models',
    method: 'get',
  })
}


export function createModel (payload) {
  return request({
    url: '/api/v1/poka/model',
    method: 'post',
    data: payload
  })
}
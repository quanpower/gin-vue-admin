import request from '@/libs/request'

export function getCategorys () {
  return request({
    url: '/api/v1/poka/categorys',
    method: 'get',
  })
}

export function createCategory (payload) {
  return request({
    url: '/api/v1/poka/category',
    method: 'post',
    data: payload
  })
}

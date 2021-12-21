import request from '@/libs/request'

export function getTasks () {
  return request({
    url: '/api/v1/poka/tasks',
    method: 'get',
  })
}

export function createTask (payload) {
  return request({
    url: '/api/v1/poka/task',
    method: 'post',
    data: payload
  })
}

export function UpdateTask (payload) {
  return request({
    url: '/api/v1/poka/task',
    method: 'put',
    data: payload
  })
}
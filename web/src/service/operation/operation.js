import request from '@/libs/request'

export function getOperations () {
  return request({
    url: '/api/v1/poka/operations',
    method: 'get',
  })
}


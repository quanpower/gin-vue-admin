import request from '@/libs/request'

export function getConfig (category_id) {
  return request({
    url: '/api/v1/poka/config',
    method: 'get',
    params: category_id
  })
}

export function getAllConfigs () {
  return request({
    url: '/api/v1/poka/all_configs',
    method: 'get',
  })
}

export function createConfig (configs) {
  return request({
    url: '/api/v1/poka/config',
    method: 'post',
    data: configs
  })
}

export function updateConfig (configs) {
  return request({
    url: '/api/v1/poka/config',
    method: 'put',
    data: configs
  })
}

export function getCreatedConfigs () {
  return request({
    url: '/api/v1/poka/created_configs',
    method: 'get',
  })
}
import request from '@/libs/request'

export function getWorkOrder (payload) {
  return request({
    url: '/api/v1/poka/work_order',
    method: 'get',
    params: payload
  })
}

export function getProducingWorkOrder (payload) {
  return request({
    url: '/api/v1/poka/producing_work_order',
    method: 'get',
    params: payload
  })
}

export function getTodayWorkOrder (payload) {
  return request({
    url: '/api/v1/poka/today_work_order',
    method: 'get',
    params: payload
  })
}


export function getHistoryWorkOrder (payload) {
  return request({
    url: '/api/v1/poka/history_work_order',
    method: 'get',
    params: payload
  })
}


export function getAllWorkOrder () {
  return request({
    url: '/api/v1/poka/all_work_order',
    method: 'get',
  })
}

export function putWorkOrder (payload) {
  return request({
    url: '/api/v1/poka/work_order',
    method: 'put',
    data: payload
  })
}

export function deleteWorkOrder (payload) {
  return request({
    url: '/api/v1/poka/work_order',
    method: 'delete',
    data: payload
  })
}
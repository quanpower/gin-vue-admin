import request from '@/libs/request'

export function getLatest100Data (device_id) {
  return request({
    url: '/api/v1/daq/latest100',
    method: 'get',
    params: device_id
  })
}

export function getLatestData (device_id) {
  return request({
    url: '/api/v1/daq/latestData',
    method: 'get',
    params: device_id
  })
}

export function getHistoryRecord (device_id) {
  return request({
    url: '/api/v1/daq/historyRecord',
    method: 'get',
    params: device_id
  })
}

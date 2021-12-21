import request from '@/libs/request'

export function getRealtimeData () {
  return request({
    url: '/api/v1/box/realtimedata',
    method: 'get'
  })
}
export function getRealtimeData2 () {
  return request({
    url: '/api/v1/box/realtimedata2',
    method: 'get'
  })
}
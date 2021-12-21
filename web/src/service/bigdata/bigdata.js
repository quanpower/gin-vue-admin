import request from '@/libs/request'

export function getBigDataRealtimeData () {
  return request({
    url: '/api/v1/bigdata/realtimedata',
    method: 'get'
  })
}

export function getBigDataRealtimeData2 () {
  return request({
    url: '/api/v1/bigdata/realtimedata3',
    method: 'get'
  })
}

export function getBigDataRealtimeData4 () {
  return request({
    url: '/api/v1/bigdata/realtimedata4',
    method: 'get'
  })
}

import request from '@/libs/request'


export function get_history_scan_items (payload) {
  return request({
    url: '/api/v1/poka/history_scan_items',
    method: 'get',
    params: payload
  })
}
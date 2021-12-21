import request from '@/libs/request'

export function getProductionOrder (production_order_id) {
  return request({
    url: '/api/v1/poka/production_order',
    method: 'get',
    params: production_order_id
  })
}


export function get_history_production_order (payload) {
  return request({
    url: '/api/v1/poka/history_production_order',
    method: 'get',
    params: payload
  })
}


export function queryHistoryReportByAxle (payload) {
  return request({
    url: '/api/v1/poka/history_report',
    method: 'get',
    params: payload
  })
}

export function get_produce_production_order (payload) {
  return request({
    url: '/api/v1/poka/produce_production_order',
    method: 'get',
    params: payload
  })
}


export function searchProductionOrderCount (payload) {
  return request({
    url: '/api/v1/poka/history_production_order_count',
    method: 'get',
    params: payload
  })
}


export function get_history_scan_items (payload) {
  return request({
    url: '/api/v1/poka/history_scan_items',
    method: 'get',
    params: payload
  })
}

export function bypass_this_operation_scan_task (payload) {
  return request({
    url: '/api/v1/poka/scan_item',
    method: 'put',
    data: payload
  })
}

export function bypass_this_operation_test_task (payload) {
  return request({
    url: '/api/v1/poka/test_item',
    method: 'put',
    data: payload
  })
}


// export function export_report (payload) {
//   return request({
//     url: '/api/v1/poka/export_report',
//     method: 'get',
//     params: payload
//   })
// }
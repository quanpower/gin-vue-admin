import request from '@/libs/request'
import qs from 'qs'

export function getCanvasJson (id) {
  return request({
    url: '/api/v1/canvas/canvasjson',
    method: 'get',
    params: id
  })
}

export function getCanvasJsonList (user_id) {
  return request({
    url: '/api/v1/canvas/canvas_json_list',
    method: 'get',
    params: user_id
  })
}

export function saveCanvasJson (data) {
  return request({
    url: '/api/v1/canvas/canvasjson',
    method: 'post',
    data: qs.stringify(data),
    loading: 'hourglass'
  })
}

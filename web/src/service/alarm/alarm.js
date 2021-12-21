import request from '@/libs/request'

export function getRs485PressureLatestData (device_id) {
  return request({
    url: '/api/v1/daq/rs485Pressure',
    method: 'get',
    params: device_id
  })
}

export function getAlarmHistoryRecord (device_id) {
  return request({
    url: '/api/v1/alarm/alarmHistoryRecord',
    method: 'get',
    params: device_id
  })
}

export function searchHistoryAlarm (payload) {
  return request({
    url: '/api/v1/poka/alarms',
    method: 'get',
    params: payload
  })
}


export function createAlarm(payload) {
  return request({
    url: '/api/v1/poka/alarm',
    method: 'post',
    data: payload
  })
}

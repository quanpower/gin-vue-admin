import request from '@/libs/request'
import qs from 'qs'

export function getUserDevices (user_id) {
  return request({
    url: '/api/v1/device/user_device',
    method: 'get',
    params: user_id
  })
}

export function getProjectDevices (project_id) {
  return request({
    url: '/api/v1/device/project_device',
    method: 'get',
    params: project_id
  })
}

export function getProductDevices (product_id) {
  return request({
    url: '/api/v1/device/product_device',
    method: 'get',
    params: product_id
  })
}

export function getDeviceProfile (deviceId) {
  return request({
    url: '/api/v1/device/device_profile',
    method: 'get',
    params: deviceId
  })
}

export function addDevice (data) {
  return request({
    url: '/api/v1/device/user_device',
    method: 'post',
    data: qs.stringify(data),
    loading: 'hourglass'
  })
}

export function getAllDevices () {
  return request({
    url: '/api/v1/poka/devices',
    method: 'get',
  })
}


export function createDevice (payload) {
  return request({
    url: '/api/v1/poka/device',
    method: 'post',
    data: payload
  })
}

export function UpdateDevice (payload) {
  return request({
    url: '/api/v1/poka/device',
    method: 'put',
    data: payload
  })
}


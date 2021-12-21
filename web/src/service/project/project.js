import request from '@/libs/request'
import qs from 'qs'

export function getProjects (user_id) {
  return request({
    url: '/api/v1/project/project',
    method: 'get',
    params: user_id
  })
}

export function addProject (data) {
  return request({
    url: '/api/v1/project/project',
    method: 'post',
    data: qs.stringify(data),
    loading: 'hourglass'
  })
}

export function getProjectProfile (project_id) {
  return request({
    url: '/api/v1/project/project_profile',
    method: 'get',
    params: project_id
  })
}

export function updateProjectProfile (data) {
  return request({
    url: '/api/v1/project/project_profile',
    method: 'post',
    data: qs.stringify(data),
    loading: 'hourglass'
  })
}

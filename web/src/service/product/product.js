import request from '@/libs/request'
import qs from 'qs'

export function getProducts (user_id) {
  return request({
    url: '/api/v1/product/product',
    method: 'get',
    params: user_id
  })
}
export function getProductProfile (productId) {
  return request({
    url: '/api/v1/product/product_profile',
    method: 'get',
    params: productId
  })
}
export function addProduct (data) {
  return request({
    url: '/api/v1/product/product',
    method: 'post',
    data: qs.stringify(data),
    loading: 'hourglass'
  })
}

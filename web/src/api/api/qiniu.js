import axios from 'axios'
export function qiniuToken () {
  return axios.get('/api/v1/core/upload/genUpToken/')
}
export function uploadToqiniu (url, params, config = {}) {
  return axios.post(url, params, config)
}

export function getUrl (filename) {
  const host = {
    https: '//up.qbox.me',
    http: '//up.qiniu.com'
  }
  const isHttps = location.href.indexOf('https') === 0
  const path = '/putb64/-1/key/' + btoa(encodeURIComponent(filename))
  return (isHttps ? host.https : host.http) + path
}

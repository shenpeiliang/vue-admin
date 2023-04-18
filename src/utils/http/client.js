import instance from './base'
import qs from 'qs'

const post = (url, data) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        transformRequest: [
          (data) => {
            return qs.stringify(data)
          },
        ],
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const get = (url, data) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, { params: data })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export default {
  post,
  get,
}

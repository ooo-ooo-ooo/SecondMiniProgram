import request from './newwork.js'

export function getMultidata(){
  return request({
    url: '/home/multidata'
  })
}

import request from '@/utils/request'

export function getAllList () {
  return request({
    url: '/apiNoteType/list',
    method: 'get'
  })
}

export function getPageList (params) {
  return request({
    url: '/apiNoteType/pageList',
    method: 'get',
    params
  })
}

export function getById (params) {
  return request({
    url: '/apiNoteType/getById',
    method: 'get',
    params
  })
}
export function addNoteType (data) {
  return request({
    url: '/apiNoteType/insert',
    method: 'post',
    data
  })
}
export function deleteNoteType (params) {
  return request({
    url: '/apiNoteType/delete',
    method: 'delete',
    params
  })
}

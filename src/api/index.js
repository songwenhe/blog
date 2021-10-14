import request from '@/utils/request'
// 
// /apiStatistical/statisticalTags
// /apiStatistical/statistical
// /apiStatistical/notesTopTen
// /apiStatistical/newNotes
// /apiStatistical/newComment
export const API = {
  LOG: 'apiLogs',
  REPLY: 'apiReply',
  TAG: 'apiNoteTags',
  NOTE: 'apiNotes',
  LOG: 'apiLogs',
  CONFIG: 'apiSysConfig',
  USER: 'apiUser',
  NOTE_TYPE: 'apiNoteType',
  COMMENT: 'apiComment',
  STATISTICAL: 'apiStatistical'
}
export const API_OTHER = {
  STATISTICAL_TAGS: 'statisticalTags',
  STATISTICAL: 'statistical',
  NOTES_TOP_TEN: 'notesTopTen',
  NEW_NOTES: 'newNotes',
  NEW_COMMENT: 'newComment',
}
/*
  common
*/
export function getAllList (path) {
  return request({
    url: `/${path}/list`,
    method: 'get'
  })
}
export function getPageList (path, params) {
  return request({
    url: `/${path}/pageList`,
    method: 'get',
    params
  })
}
export function getById (path, params) {
  return request({
    url: `/${path}/getById`,
    method: 'get',
    params
  })
}
export function insertOne (path, data) {
  return request({
    url: `/${path}/insert`,
    method: 'post',
    data
  })
}
export function editOne (path, data) {
  return request({
    url: `/${path}/update`,
    method: 'put',
    data
  })
}
export function deleteOne (path, params) {
  return request({
    url: `/${path}/delete`,
    method: 'delete',
    params
  })
}
/*
  user 
 */
export function getUser (path, params) {
  return request({
    url: `/${path}/pageUser`,
    method: 'get',
    params
  })
}

export function editUser (data) {
  console.log(data);
  return request({
    url: `/apiUser/updateIgnoreNull`,
    method: 'put',
    data
  })
}

export function changePassword (params) {
  return request({
    url: '/apiUser/changePassword',
    method: 'get',
    params
  })
}

export function login (data) {
  return request({
    url: '/apiUser/api/login' + data,
    method: 'post',
  })
}
export function logout (params) {
  return request({
    url: '/apiUser/logout',
    method: 'get',
    params
  })
}

export function register (data) {
  return request({
    url: '/apiUser/login',
    method: 'post',
    data
  })
}
/**
 * tag
 */

export function getTagById (params) {
  console.log(params);
  return request({
    url: '/apiNotes/getListByTags',
    method: 'get',
    params
  })
}
/*
 * other 
 */
export function uploadFile (data) {
  return request({
    url: `/file/uploadFile`,
    method: 'post',
    data
  })
}
export function alipay (data) {
  return request({
    url: `/alipay/alipay`,
    method: 'post',
    data
  })
}
/**
 * static
 */
export function getOther (path, params) {
  return request({
    url: `/${API.STATISTICAL}/${path}`,
    method: 'get',
    params
  })
}

function isPrimeNumber (num) {
  if (num === 1) return false
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false
    }
  }
  return true
}


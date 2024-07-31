import request from '../../utils/request'

// 上传文件
export function uploadFile(data, headers = {}) {
  return request({
    url: '/bpf-file-api/file/uploadFile',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      ...headers
    },
    data
  })
}

// 保存业务单号（增量上传）
export function saveBizId(data = {}) {
  return request({
    url: '/bpf-file-api/file/saveBizId',
    method: 'post',
    data
  })
}

// 业务单号保存（全量保存）
export function saveBizIdAll(data = {}) {
  return request({
    url: '/bpf-file-api/open/file/saveBizId',
    method: 'post',
    data
  })
}

// 业务单号保存（全量保存）- 批量操作
export function batchSaveBizId(data = {}) {
  return request({
    url: '/bpf-file-api/open/file/batchSaveBizId',
    method: 'post',
    data
  })
}

// 根据业务ID查询文件
export function listFile(data = {}) {
  return request({
    url: '/bpf-file-api/file/listFile',
    method: 'post',
    data
  })
}

// 根据业务ID查询文件
export function deleteByBizId(data = {}) {
  return request({
    url: '/bpf-file-api/open/file/deleteByBizId',
    method: 'post',
    data
  })
}

// 文件与业务单号关系保存
export function saveBizFileRelation(data = {}) {
  return request({
    url: '/bpf-file-api/open/file/saveBizFileRelation',
    method: 'post',
    data
  })
}
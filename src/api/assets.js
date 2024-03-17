import request from '@/utils/request'

// 获取资产列表
export const getAssetsListService = () => request.get('assets/')

// 添加资产
export const addAssetsService = (data) => request.post('assets_create/', data)

// 删除资产
export const deleteAssetsService = (id) =>
  request.delete(`assets_delete/${id}/`)

// 更新资产
export const updateAssetsService = (id, data) =>
  request.patch(`assets_update/${id}/`, data)

// 筛选资产
export const filterAssetsService = (data1, data2) =>
  request.get(`assets_filter/?state=${data1}&&asset_type=${data2}`)

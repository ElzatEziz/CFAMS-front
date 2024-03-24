import request from '@/utils/request'

// 获取库存列表
export const getInventoryListService = () => request.get('inventory/')
// 新增库存
export const addInventoryService = (data) =>
  request.post('inventory_create/', data)
// 编辑库存
export const updateInventoryService = (id, data) =>
  request.put(`inventory_update/${id}/`, data)
// 删除库存
export const deleteInventoryService = (id) =>
  request.delete(`inventory_delete/${id}/`)

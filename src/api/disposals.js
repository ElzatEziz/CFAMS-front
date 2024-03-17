import request from '@/utils/request'

// 获取处置列表
export const getDisposalsListService = () => request.get('disposals/')

// 新增处置
export const addDisposalsService = (data) => request.post('disposals/', data)

// 编辑处置
export const updateDisposalsService = (id, data) => request.put(`disposals/${id}/`, data)

// 删除处置
export const deleteDisposalsService = (id) => request.delete(`disposals/${id}/`)


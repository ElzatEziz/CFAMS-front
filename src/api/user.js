import request from '@/utils/request.js'

// 注册接口
export const userRegisterService = (formData) =>
  request.post('register/', formData)

// 登录接口
export const userLoginService = (formData) => request.post('login/', formData)

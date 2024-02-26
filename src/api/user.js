import request from '@/utils/request.js'

// 注册接口
export const userRegisterService = (formData) =>
  request.post('register/', formData)

// 登录接口
export const userLoginService = (formData) => request.post('login/', formData)

// 获取登录用户信息
export const userInfoService = () => request.get('current_user/')

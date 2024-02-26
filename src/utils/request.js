import axios from 'axios'
import { useUserStore } from '@/stores'
const baseURL = 'http://127.0.0.1:8000/'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})
instance.interceptors.request.use(
  function (config) {
    // 获取存储在localStorage或其他地方的Token
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
      // 如果Token存在，则在每个请求的头部添加Authorization
      config.headers['Authorization'] = token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log(error.response)
    const message = error.response?.data?.detail || '服务异常'
    ElMessage.error(message)
    return Promise.reject(error)
  }
)
// // 请求拦截器
// instance.interceptors.request.use(
//   (config) => {
//     //TODO 2.携带Token
//     const userStore = useUserStore()
//     if (userStore.token) {
//       config.headers.Authorization = userStore.token
//     }
//     return config
//   },
//   (err) => Promise.reject(err)
// // )
// // 响应拦截器
// instance.interceptors.response.use(
//   (res) => {
//     // TODO 4. 摘取核心响应数据
//     if (res.data.code === 201) {
//       return res
//     }
//     // TODO 3. 处理业务失败
//     // 处理业务失败，给错误地址，抛出错误
//     ElMessage.error(res.data.message || '服务异常')
//     return Promise.reject(res.data)
//   },
//   (err) => {
//     // TODO5. 处理401错误
//     //错误的特殊情况 =》 401 全县不足 或 token过期 =》 拦截到登陆
//     if (err.response?.status === 401) {
//       router.push('/login')
//     }

//     // 错误的默认情况
//     ElMessage.error(err.response.data.message || '服务异常')
//     return Promise.reject(err)
//   }
// )
export default instance
export { baseURL }

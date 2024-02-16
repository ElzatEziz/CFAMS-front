import { defineStore } from 'pinia'
import { ref } from 'vue'
// 用户模块的token，setToken，removeToken 持久化模块
export const useUserStore = defineStore(
  'user-token',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    return {
      token,
      setToken,
      removeToken
    }
  },
  {
    persist: true
  }
)

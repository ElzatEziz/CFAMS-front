import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userInfoService } from '@/api/user'
// 用户模块的token，setToken，removeToken 持久化模块
export const useUserStore = defineStore(
  'user-token',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = 'Bearer ' + newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const user = ref({})
    const getUser = async () => {
      const res = await userInfoService()
      console.log(res)
      if (res.data[0].role === 'manager') {
        res.data[0].role = '资产管理人员'
      } else {
        res.data[0].role = '系统管理员'
      }
      user.value = res.data[0]
      console.log(user.value)
    }
    const setUser = (obj) => {
      user.value = obj
    }

    return {
      token,
      user,
      setUser,
      setToken,
      removeToken,
      getUser
    }
  },
  {
    persist: true
  }
)

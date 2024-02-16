import { defineStore } from 'pinia'
import { ref } from 'vue'
// 用户模块的token，setToken，removeToken 持久化模块
export const useCountStore = defineStore('counter-add', () => {
  const count = ref(100)
  const add = (data) => {
    count.value += data
  }

  return {
    count,
    add
  }
})

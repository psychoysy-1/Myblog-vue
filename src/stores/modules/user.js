import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'blog-user',
  () => {
    // 配置token信息获取删除等
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    // 配置用户信息
    const user = ref({})
    const setUser = (newUser) => {
      user.value = newUser
    }
    const removeUser = () => {
      user.value = {}
    }

    // 导出
    return {
      token,
      setToken,
      removeToken,
      user,
      setUser,
      removeUser
    }
  },
  {
    persist: true //开启持久化
  }
)

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfoService } from '@/api/user'

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
    const getUser = async () => {
      const res = await getUserInfoService(user.value._id) //请求获取数据
      console.log(res)
      user.value = res.data.data
    }
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
      getUser,
      setUser,
      removeUser
    }
  },
  {
    persist: true //开启持久化
  }
)

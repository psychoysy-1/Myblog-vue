import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBlogStore = defineStore(
  'blog-content',
  () => {
    const blogContent = ref('')
    const setBlogContent = (content) => {
      blogContent.value = content
    }
    // 导出
    return {
      blogContent,
      setBlogContent
    }
  },
  {
    persist: true
  }
)

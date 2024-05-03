import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore(
  'theme',
  () => {
    let theme = ref('')
    const setTheme = (newTheme) => {
      if (['light', 'dark'].includes(newTheme)) {
        theme.value = newTheme
      } else {
        console.error(`Invalid theme value: ${newTheme}`)
      }
    }
    return {
      theme,
      setTheme
    }
  },
  {
    persist: true //开启持久化
  }
)

import { createPinia } from 'pinia'
// pinia持久化插件
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // base: path.resolve(__dirname, './'),
  base:"./",
  server:{
    port:3000
  },
  plugins: [vue()]
})

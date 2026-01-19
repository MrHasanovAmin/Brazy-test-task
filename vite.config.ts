import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  css: {
    // настройка модульных стилей
    modules: {
      generateScopedName: '[name]_[local]___[hash:base64:5]',
    },
    postcss: {
      plugins: [autoprefixer()]
    }
  },
})

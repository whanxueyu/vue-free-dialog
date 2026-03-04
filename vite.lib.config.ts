import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/components/**/*.{vue,ts}'],
      outDir: 'dist',
      tsconfigPath: './tsconfig.app.json'
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/free-dialog.vue'),
      name: 'VueFreeDialog',
      fileName: (format) => `vue-free-dialog.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'style.css'
          }
          return assetInfo.name || ''
        }
      }
    },
    minify: 'terser',
    sourcemap: true,
    emptyOutDir: true
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        open: true,
        proxy: {
            '/api': {
                target: 'https://rocanoa.indpecker.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '') // 将 /api 重写为空
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/common/css/base.scss";`
            }
        }
    }
})

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
                // target: 'http://192.168.1.53:8094',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '') // 将 /api 重写为空
            }
        }
    },
    base: 'agilebpm-ui/board/index/',// 线上打包
    // base: '/board/index/', // localhost打包
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

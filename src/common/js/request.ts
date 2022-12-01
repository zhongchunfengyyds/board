import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { message } from 'antd';

let baseURL = '/api'
if (process.env.NODE_ENV != 'development') {
    // 生产环境
    baseURL = window.location.origin
}
// import store from '@/store'

/**
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code: number) => {
    switch (code) {
        case 10001:
            window.location.href = '/'
            break
        default:
            break
    }
}

/**
 * @description axios初始化
 */
const instance = axios.create({
    baseURL,
    timeout: 20000,
    headers: {
        // 'Content-Type': 'application/json;charset=UTF-8',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
})

/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
    (config: any) => {
        // 设置token
        config.headers['Authorization'] = document.cookie.split('Authorization=')[1] || 'Bearer-eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJhZ2lsZUJQTSIsInN1YiI6ImFkbWluOnJvY2FuT0EiLCJhdWQiOiJwYyIsImlhdCI6MTY2OTg4MjM5OX0.AEjywHceisD8AWy9HSDuUAIuNtS5wOt6ufbmE5iH9ilxYzzARxCmDgglWotpCXfLIPiMjVPB3livaeNvgCVHQA'
        console.log(config);
        
        return config
    },
    (error: AxiosRequestConfig) => {
        return Promise.reject(error)
    }
)

/**
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log(response);
        const { data } = response

        const { code } = data as any
        if (code == '200' || code == 0) {
            return data
        } else {
            message.error(data.message || data.msg)
            handleCode(code)
        }
    },
    (error: any) => {
        console.error(error);
    }
)

export default instance
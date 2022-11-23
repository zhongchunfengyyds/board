import axios from 'axios'
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
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
  (config: any) => {
    console.log(config);
        
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

/**
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
  (response: any) => {
    const { data, config } = response
    const { code, msg } = data as any
    if (data.success) {
      return data
    } else {
      message.error(msg)
      handleCode(code)
    }
  },
  (error: any) => {
    console.error(error);
  }
)

export default instance
import axios from "axios";

const service = axios.create({
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    withCredentials: true,
    timeout: 3000
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        return config
    },
    (err) => {
        err.message = '服务器异常，请联系管理员！'
        // 错误抛到业务代码
        return Promise.reject(err)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        return response
    },
    (err)=>{
        err.message = '请求超时或服务器异常，请检查网络或联系管理员！'
        console.log(JSON.stringify(err))
        return Promise.reject(err)
    }
)

export default service

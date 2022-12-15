import { proxy, unProxy } from "ajax-hook"
import { upload } from "./api"

let DATA_MAP = {}
export function init() {
    DATA_MAP = {}
    proxy({
        //请求发起前进入
        onRequest: (config, handler) => {
            console.log(`config: ${_stringify(config)}`)
            recorderData(config)
            handler.next(config);
        },
        //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
        onError: (err, handler) => {
            console.log(`error: ${_stringify(err)}`)
            recorderData(err)
            handler.next(err)
        },
        //请求成功后进入
        onResponse: (response, handler) => {
            console.log(`response: ${_stringify(response)}`)
            recorderData(response)
            handler.next(response)
        }
    })
    console.log('init success...')
}

export function destroy() {
    unProxy()
    DATA_MAP = {}
    console.log('destroy success...')
}

/**
 *
 * @param data XhrRequestConfig | XhrError | XhrResponse
 */
function recorderData(data) {
    if (data.type) {
        // 判断是 XhrError
        const key = data?.config?.url
        DATA_MAP[key] = {
            ...DATA_MAP[key],
            code: -1,
            msg: data.type
        }
        uploadData(key)
    } else if (data.response) {
        // 判断是 XhrResponse
        const key = data?.config?.url
        DATA_MAP[key] = {
            ...DATA_MAP[key],
            code: data.status,
            msg: data.statusText,
            res: data.response
        }
        uploadData(key)
    } else {
        // XhrRequestConfig
        const key = data?.url
        DATA_MAP[key] = {
            config: data
        }
    }

}

function uploadData(key) {
    const data = DATA_MAP[key]
    console.log(`data: uploadData.......${_stringify(data)}`)
    upload(data).then(res => {
        console.log(`res: ${res}`)
    }).catch(error => {
        console.log(`error: ${error}`)
    })
}

function _stringify(obj) {
    // 声明cache变量，便于匹配是否有循环引用的情况
    let cache = []
    const s = JSON.stringify(obj, function(key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // 移除
                return
            }
            // 收集所有的值
            cache.push(value)
        }
        return value
    })
    // 清空变量，便于垃圾回收机制回收
    cache = null
    return s
}

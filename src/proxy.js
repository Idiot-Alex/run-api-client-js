import { proxy, unProxy } from "ajax-hook"
import { initWS } from "./stomp"


let ws = null
let DATA_MAP = {}
export function init() {
    return new Promise((resolve, reject) => {
        ws = initWS('127.0.0.1', '8080', 'http')
        ws.connect({}).then(res => {
            console.log(`connect res: ${_stringify(res)}`)
            ws.subscribe((msg) => {
                console.log(`subscribe msg: ${JSON.stringify(msg)}`)
            })
            proxy({
                //请求发起前进入
                onRequest: async (config, handler) => {
                    console.log(`config: ${_stringify(config)}`)
                    await recorderData(config)
                    handler.next(config);
                },
                //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
                onError: async (err, handler) => {
                    console.log(`error: ${_stringify(err)}`)
                    await recorderData(err)
                    handler.next(err)
                },
                //请求成功后进入
                onResponse: async (response, handler) => {
                    console.log(`response: ${_stringify(response)}`)
                    await recorderData(response)
                    handler.next(response)
                }
            })
            DATA_MAP = {}
            resolve()
        }).catch(error => {
            console.error(`init error...${_stringify(error)}`)
            reject(error)
        })
    })
}

export function destroy() {
    return new Promise(resolve => {
        unProxy()
        ws.disconnect()
        DATA_MAP = {}
        resolve()
    })
}

/**
 *
 * @param data XhrRequestConfig | XhrError | XhrResponse
 */
function recorderData(data) {
    return new Promise((resolve, reject) => {
        if (data.type) {
            // 判断是 XhrError
            const key = data?.config?.url
            DATA_MAP[key] = {
                ...DATA_MAP[key],
                code: -1,
                msg: data.type
            }
            uploadData(key, resolve, reject)
        } else if (data.response) {
            // 判断是 XhrResponse
            const key = data?.config?.url
            DATA_MAP[key] = {
                ...DATA_MAP[key],
                code: data.status,
                msg: data.statusText,
                res: data.response
            }
            uploadData(key, resolve, reject)
        } else {
            // XhrRequestConfig
            const {
                headers, method, url, async, withCredentials, body
            } = data
            const key = data?.url
            DATA_MAP[key] = {
                config: {
                    headers, method, url, async, withCredentials, body
                }
            }
            console.log(`dataMap: ${_stringify(DATA_MAP)}`)
            resolve()
        }
    })
}

async function uploadData(key, resolve, reject) {
    console.log(`key: ${key}`)
    const data = DATA_MAP[key]
    console.log(`data: uploadData.......${_stringify(data)}`)

    ws.sendMsg(data)
    resolve()
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

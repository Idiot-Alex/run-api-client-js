import { proxy, unProxy } from "ajax-hook"
import { RunApiWebSocket } from "./stomp"

export function init() {
    const ws = initWS()
    proxy({
        //请求发起前进入
        onRequest: (config, handler) => {
            console.log(`url: ${_stringify(config)}`)
            handler.next(config);
        },
        //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
        onError: (err, handler) => {
            console.log(`error type: ${err.type}`)
            handler.next(err)
        },
        //请求成功后进入
        onResponse: (response, handler) => {
            console.log(`response: ${response.response}`)
            handler.next(response)
        }
    })
    console.log('init success...')
}

export function destroy() {
    unProxy()
    console.log('destroy success...')
}

export function initWS() {
    const ws = new RunApiWebSocket('http://127.0.0.1:8080/stomp/endpoint')
    ws.initWebSocket()
    return ws
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

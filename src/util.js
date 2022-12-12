import {proxy, unProxy} from "ajax-hook"

export function init() {
    proxy({
        //请求发起前进入
        onRequest: (config, handler) => {
            console.log(`url: ${config.url}`)
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
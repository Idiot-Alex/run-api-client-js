import service from './axios-server'

export function upload(data) {
    return service({
        url: `http://192.168.1.13:8080/client-js/upload`,
        method: 'POST',
        data: data
    })
}
export function test() {
    return service({
        url: 'https://bird.ioliu.cn/v1',
        method: 'GET'
    })
}
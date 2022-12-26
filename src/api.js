import service from './axios-server'

export function upload(data) {
    return service({
        url: `http://121.42.160.109:8080/client-js/upload`,
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
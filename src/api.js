import service from './axios-server'

export function upload (data) {
    return service({
        url: `http://127.0.0.1:8080/client-js/upload`,
        method: 'POST',
        data: data
    })
}
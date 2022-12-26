import SockJS from "sockjs-client"
import Stomp from "stompjs"

const DEFAULT_ENDPOINT = '/stomp/endpoint'
const DEFAULT_DESTINATION = '/app/upload'
const DEFAULT_TOPIC = '/topic/response'

class RunApiWebSocket {
    constructor(url) {
        this.url = url
        this.socketClient = null
    }

    initWebSocket() {
        if (!this.socketClient) {
            const webSocket = new SockJS(this.url)
            this.socketClient = Stomp.over(webSocket)
        }
        return this.socketClient
    }

    connect(option= {}) {
        return new Promise((resolve, reject) => {
            if (!checkNotNull(this.socketClient)) {
                reject('need init first')
            }
            console.log(`ready to connect websocket url: ${this.url}`)
            this.socketClient.connect(option,
                (data) => {
                    resolve(data)
                },
                (error) => {
                    reject(error)
                })
        })
    }

    subscribe(callback, url= DEFAULT_TOPIC) {
        if (!checkValid(this.socketClient)) {
            return
        }
        this.socketClient.subscribe(url, callback)
    }

    sendMsg(body, headers = {}, destination = DEFAULT_DESTINATION) {
        if (!checkValid(this.socketClient)) {
            return
        }
        if (typeof body === 'object') {
            body = JSON.stringify(body)
        }
        console.log(`--------: ${body}`)
        this.socketClient.send(destination, headers, body)
    }

    disconnect() {
        if (checkNotNull(this.socketClient)) {
            console.log(`disconnect websocket url: ${this.url}`)
            this.socketClient.disconnect()
            this.socketClient = null
        }
    }
}

function checkNotNull(socketClient) {
    if (!socketClient) {
        console.log(`error: current socketClient has not be init.`)
        return false
    }
    return true
}
function checkValid(socketClient) {
    if (!checkNotNull(socketClient)) {
        return false
    }
    if (socketClient.ws.readyState !== 1) {
        console.log(`error: current socketClient readyState is: ${socketClient.ws.readyState}`)
        return false
    }
    return true
}

export function initWS(ip, port, protocol = 'http', endpoint = DEFAULT_ENDPOINT) {
    if (endpoint.indexOf('/') !== 0) {
        throw new Error('The ${endpoint} must be start with [/]')
    }
    const _url = `${protocol}://${ip}:${port}${endpoint}`
    const ws = new RunApiWebSocket(_url)
    ws.initWebSocket()
    return ws
}
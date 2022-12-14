import SockJS from "sockjs-client"
import Stomp from "stompjs"

export class RunApiWebSocket {
    constructor(url) {
        this.url = url
        this.socketClient = null
    }
    initWebSocket() {
        const webSocket = new SockJS(this.url)
        this.socketClient = Stomp.over(webSocket)
        return this.socketClient
    }
    connect(option) {
        return new Promise((resolve, reject) => {
            if (!checkValid(this.socketClient)) {
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
    disconnect() {
        if (checkValid(this.socketClient)) {
            console.log(`disconnect websocket url: ${this.url}`)
            this.socketClient.disconnect()
        }
    }
}

function checkValid(socketClient) {
    if (!socketClient) {
        console.log(`error: current socketClient has not be init.`)
        return false
    }
    return true
}

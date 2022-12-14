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
    connect(option, successCb, errorCb) {
        if (!this.socketClient) {
            console.log(`error: current socketClient has not be init.`)
            return
        }
        this.socketClient.connect(option, successCb, errorCb)
    }
}

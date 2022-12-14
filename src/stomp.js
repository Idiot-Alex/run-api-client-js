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
        return new Promise((resolve, reject) => {
            this.socketClient.connect(option,
                function connectCallback (success) {
                    console.log('webSocket连接成功:', success)
                },
                // 连接失败时的回调函数
                function errorCallBack (error) {
                    console.log('webSocket连接失败:', error)
                })
        })
    }
}

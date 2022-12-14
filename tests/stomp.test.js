import RunApi from "dist/bundle"

describe('test stomp js', function() {

    test('test initWS', async () => {
        const successCb = (data) => {
            console.log(`successCb: `, data)
        }
        const errorCb = (error) => {
            console.log(`errorCb: `, error)
        }
        const ws = RunApi.ws('http://127.0.0.1:8080/stomp/endpoint')
        ws.initWebSocket()
        await ws.connect({}, successCb, errorCb)
    })
})
import RunApi from "dist/bundle"

describe('test stomp js', function() {

    test('test initWS', () => {
        const successCb = function (data) {
            console.log(data)
        }
        const errorCb = function (error) {
            console.log(error)
        }
        const ws = RunApi.ws('')
        ws.connect({}, successCb, errorCb)
        ws.initWebSocket()
        expect(ws.url).toHaveLength(0)
    })
})
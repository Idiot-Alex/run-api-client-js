import RunApi from "dist/bundle"

describe('test stomp js', function() {
    const ws = RunApi.ws('http://127.0.0.1:8080/stomp/endpoint')

    beforeEach(() => {
        ws.initWebSocket()
    })

    afterEach(() => {
        ws.disconnect()
    })

    test('test ws connect', async () => {
        await ws.connect({}).then(res => {
            console.log(`res: ${JSON.stringify(res)}, typeof: ${typeof res}`)
        }).catch(error => {
            console.log(`error: ${error}`)
        })
    })

    test('test ws subscribe', async () => {
        await ws.connect({}).then(async (res) => {
            console.log(`..........res: ${JSON.stringify(res)}`)
            ws.subscribe((msg) => {
                console.log(`subscribe msg: ${JSON.stringify(msg)}`)
            })

            await new Promise((resolve, reject) => {
                ws.sendMsg()
                setTimeout(() => {
                    resolve()
                }, 3000)
            })
        })
    })
})
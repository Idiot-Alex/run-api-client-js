import RunApi from "dist/bundle"

describe('test stomp js', function() {
    const ws = RunApi.ws('127.0.0.1', '8080', 'http', '/stomp/endpoint')

    beforeEach(() => {
        ws.connect()
    })

    afterEach(() => {
        ws.disconnect()
    })

    test('test ws subscribe', async () => {
        await ws.connect({}).then(async (res) => {
            console.log(`..........res: ${JSON.stringify(res)}`)
            ws.subscribe((msg) => {
                console.log(`subscribe msg: ${JSON.stringify(msg)}`)
            })

            await new Promise((resolve, reject) => {
                ws.sendMsg('hello, world')
                setTimeout(() => {
                    resolve()
                }, 3000)
            })
        })
    })
})
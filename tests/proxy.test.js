import RunApi from "dist/bundle"
import axios from "axios"
import {upload} from "../src/api";

// edge://flags/
// chrome://flags/#block-insecure-private-network-requests
describe('test proxy js', function() {
    beforeEach(async () => {
        console.log("beforeEach for init...")
        await RunApi.init()
    })

    afterEach(() => {
        console.log("afterEach for destroy...")
        RunApi.destroy()
    })

    // test('use axios request success', async () => {
    //     const res = await axios.get('https://bird.ioliu.cn/v1')
    //     console.log(`response: ${JSON.stringify(res.data)}`)
    //     expect(JSON.stringify(res.data)).toMatch(/"code":200/)
    // })

    // test('use axios request failed', async () => {
    //     await axios.get('https://bird.ioliu.cn/xxx').then(res => {
    //         console.log(`response: ${res}`)
    //         expect(JSON.stringify(res.data)).toMatch(/"code":200/)
    //     }).catch(err => {
    //         console.log(`error: ${err}`)
    //         expect(JSON.stringify(err)).toMatch(/Network Error/)
    //     })
    // })

    test('test upload', async () => {
        const data = {
            "config": {
                "headers": {"accept":"application/json, text/plain, */*"},
                "method":"GET",
                "url":"https://bird.ioliu.cn/v1",
                "async":true,
                "withCredentials":false,
                "body":null
            },
            "code":200,
            "msg":"OK",
            "res":"{\"data\":{\"IP\":\"101.229.2.255\",\"Info\":\"Please Set URL Like This: http://bird.ioliu.cn/v1/?url=http[s]://YourWantProxyUrl.Com\"},\"status\":{\"code\":200,\"message\":\"\"}}"
        }
        const res = await upload(data)
        console.log(`------: ${JSON.stringify(res)}`)
    })

})
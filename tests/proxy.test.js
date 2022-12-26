import RunApi from "dist/bundle"
import axios from "axios"
import { async } from "../dist/bundle"
// import {test} from "../src/api";

// edge://flags/
// chrome://flags/#block-insecure-private-network-requests
describe('test proxy js', function() {
    beforeEach(async () => {
        console.log("beforeEach for init...")
        await RunApi.init()
    })

    afterEach(async () => {
        console.log("afterEach for destroy...")
        await RunApi.destroy()
    })

    test('use axios request success', async () => {
        const res = await axios.get('https://bird.ioliu.cn/v1')
        console.log(`response: ${JSON.stringify(res.data)}`)
        expect(JSON.stringify(res.data)).toMatch(/"code":200/)
    })

    test('use axios request failed', async () => {
        await axios.get('https://bird.ioliu.cn/xxx').then(res => {
            console.log(`response: ${res}`)
            expect(JSON.stringify(res.data)).toMatch(/"code":200/)
        }).catch(err => {
            console.log(`error: ${err}`)
            expect(JSON.stringify(err)).toMatch(/Network Error/)
        })
    })

})
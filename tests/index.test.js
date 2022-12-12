import {runApi} from "dist/bundle";

describe('test index js', function() {
    test('test1', function() {
        runApi.init()
        expect(true)
    })
})
import { proxy } from 'ajax-hook'

const runApi = {
    init: () => {
        proxy({})
        console.log('init....')
    },
    destroy: () => {
        console.log('destroy...')
    }
}

export default runApi
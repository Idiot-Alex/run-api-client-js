import { init, destroy } from './proxy'
import { RunApiWebSocket } from './stomp'


export default {
    init: () => init(),
    destroy: () => destroy(),
    ws: (url) => new RunApiWebSocket(url)
}
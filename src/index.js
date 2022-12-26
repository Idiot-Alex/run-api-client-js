import { init, destroy } from './proxy'
import { upload } from "./api";
import { initWS } from './stomp'

export default {
    init: () => init(),
    destroy: () => destroy(),
    upload: (data) => upload(data),
    ws: (ip, port, protocol, endpoint) => initWS(ip, port, protocol, endpoint)
}
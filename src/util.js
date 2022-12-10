import { proxy } from "ajax-hook";

export function init() {
    proxy({})
    console.log('init....')
}
export function destroy() {
    console.log('destroy...')
}
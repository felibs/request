import debounce from 'loadsh.debounce'
import throttle from 'lodash.throttle'
import { runType } from './types';

/** 组件总数 */
function _run(fn: Function, type: runType, interval?: number): Function {
    return {
        normal: () => {
            return fn
        },
        debounce: () => {
            return debounce(fn, interval)
        },
        throttle: () => {
            return throttle(fn, interval)
        }
    }[type]()
}
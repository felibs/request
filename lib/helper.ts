// import debounce from 'lodash-es/debounce'
// import throttle from 'lodash-es/throttle'

import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'

import { OptionInstance } from './type'

// noop
export function noop(...arg: any): any {}

export function type(p: any): string {
    return Object.prototype.toString.call(p).slice(8, -1)
}

export function toArray(p: any): Array<any> {
    if (Array.isArray(p)) {
        return p
    } else {
        return [p]
    }
}

// 是否为promise
export function isPromise(fn: any): boolean {
    return type(fn) === 'Promise' || (type(fn) === 'Function' && type(fn.then) === 'Function' && type(fn.catch) === 'Function')
}

// 最先执行的format函数
export function resultFormat(result: Array<any>): any {
    if (Array.isArray(result) && result.length === 1) {
        return result[0]
    } else {
        return result
    }
}

// 对run封装，返回真正的run
export function wrapperRun(option: OptionInstance, fn: (...arg: any) => any): (...arg: any) => any {
    if (option.debounce > 0) {
        return debounce(fn, option.debounce)
    } else if (option.throttle > 0) {
        return throttle(fn, option.throttle)
    } else {
        return fn
    }
}
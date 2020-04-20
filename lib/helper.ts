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



// // 执行同步或者异步函数
// export async function execute(fn: Function, args: any = [], ctx?: Object): Promise<any> {
//     if (type(fn) === 'AsyncFunction') {
//         return await fn.apply(ctx || null, args)
//     } else {
//         const result = fn.apply(ctx || null, args)
//         if (isPromise(result)) {
//             return await result
//         } else {
//             return result
//         }
//     }
// }

// // 执行器，可以执行同步任务，异步任务队列
// export async function executer(fnList: Array<execItem>, type: execType = execType.async): Promise<any> {
//     if (type === execType.async) {
//         return Promise.all(fnList.map((item) => execute(item.fn, item.args, item.ctx)))
//     } else if (type === execType.asynchronous) {
//         const fns = fnList.slice();
//         let item = fns.shift()
//         let result = null
//         while (item) {
//             result = await execute(item.fn, item.args, item.ctx)
//             item = fns.shift();
//             (item as any).args = [result];
//         }
//         return result
//     }
// }



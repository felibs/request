import axios from 'axios'
import { AxiosRequestConfig } from 'axios/index.d'

export function serializeMethod(fn: () => Promise<any>):(() => Promise<any>)[];
export function serializeMethod(api: string | string[]): (() => Promise<any>)[];
export function serializeMethod(config: AxiosRequestConfig | AxiosRequestConfig[]): (() => Promise<any>)[];

export function serializeMethod(method: any): Promise<any>[] {
    let serializeList = Array.isArray(method) ? [...method] : [method]
    return serializeList.map(item => {
        if (typeof item === 'string') {
            return () => axios({ url: item })
        } else if (typeof item === 'function') {
            return item
        } else {
            return () => axios(item)
        }
    })
}

// export function serializeOption(options?: Options) {
//     return
// }
// const sites:(() => Promise<any>)[] = [() => new Promise(() => {})]

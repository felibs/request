import { AxiosRequestConfig } from 'axios/index.d'
import { Ref } from '@vue/reactivity/dist/reactivity.d'

// 基础的返回信息
export interface baseResult {
    loading: Ref<boolean>
    data: Ref<any>
    run?: (...arg: any) => any
    error: Ref<any>
    cancel?: () => void
    fetches?: Ref<any>
}

// requst的第一个参数
export type api = AxiosRequestConfig | string | ((...arg: any) => any)

// 参数
export type Option = {
    manual?: boolean // 是否需要手动触发
    onSuccess?: (...arg: any) => any // 成功回掉
    onError?: (...arg: any) => any // default: noop, // 失败回掉
    loading?: boolean // default: false // 默认loading的值
    data?: any // default: null // 默认的数据
    params?: Object | [] //default: [], // 请求的参数
    throttle?: number // default: 0, // 节流时间（ms）
    debounce?: number // default: 0, // 防抖时间（ms）
    format?: (...arg: any) => any // default: noop, //对结果进行转换
    async?: boolean // default: true // promise All是否并行，true：异步，false，同步
    cacheKey?: string // 对结果进行缓存, 全局, 预加载数据
    key?: ((...arg: any) => string) | null // 可以实现多个loading
    refreshDeps?: Array<Ref> | null
}

export type OptionInstance = {
    manual: boolean // 是否需要手动触发
    onSuccess: (...arg: any) => any // 成功回掉
    onError: (...arg: any) => any // default: noop, // 失败回掉
    loading: boolean // default: false // 默认loading的值
    data: any // default: null // 默认的数据
    params: Object | [] //default: [], // 请求的参数
    throttle: number // default: 0, // 节流时间（ms）
    debounce: number // default: 0, // 防抖时间（ms）
    format: Array<execItem> // default: noop, //对结果进行转换
    async: boolean, // default: true // promise All是否异步，true：异步，false，同步
    cacheKey: string // 对结果进行缓存, 全局, 预加载数据
    key: ((...arg: any) => string) | null // 可以实现多个loading
    refreshDeps: Array<Ref> | null
}

// run函数类型
export enum runType {
    normal = 'normal',
    debounce = 'debounce',
    throttle = 'throttle',
}

export enum execType {
    async = 'async', // 同步
    asynchronous = 'asynchronous', // 异步
}

export enum execItemType {
    string = 'string',
    axios = 'axios',
    functional = 'functional'
}

// 执行函数的每项
export type execItem = {
    fn: Function
    ctx?: any
    args?: Array<any>
    type?: execItemType
    initArgs?: Array<any>
}

export type execResult = {
    data: any
    error: any
}
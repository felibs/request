// import { ComputedRef } from '@vue/runtime-core'

import { AxiosRequestConfig } from 'axios/index.d'

export interface baseResult {
    loading: any;
    data: any;
    run: () => void;
    error: any;
    cancel: () => void;
}

export type Method = AxiosRequestConfig | string | string[] | AxiosRequestConfig[]


// export type Method =
//     | string
//     | Promise<any>
//     | {
//           uri: string
//           method?: string
//       }
//     | string[]
//     | {
//           uri: string
//           method?: string
//       }[]
//     | Promise<any>[]

// 参数类
export type Options = {
    manual: boolean // 是否需要手动触发
    onSuccess: () => void; // 成功回掉
    onError: () => void; // default: noop, // 失败回掉
    loading: boolean; // default: false // 默认loading的值
    data: any; // default: null // 默认的数据
    params: any; //default: null, // 请求的参数
    throttle: number; // default: 0, // 节流时间（ms）
    debounce: number; // default: 0, // 防抖时间（ms）
    format: () => void; // default: noop, //对结果进行转换
    serial: boolean; // default: false // promise All是否并行，true：串行，false，并行
    cacheKey: string; // 对结果进行缓存, 全局, 预加载数据
    key: () => void; // 可以实现多个loading
}

// run函数类型
export enum runType {
    normal = "normal",
    debounce = "debounce",
    throttle = "throttle",
}
import axios from 'axios'
import { noop, resultFormat, toArray } from './helper'
import { api, Option, OptionInstance, execItem, execItemType } from './type'

export function serializeMethod(method: api | api[]): execItem[] {
    let serializeList = Array.isArray(method) ? [...method] : [method]
    return serializeList.map((item) => {
        if (typeof item === 'string') {
            return {
                fn: axios,
                args: [{ url: item, method: 'GET' }],
                ctx: null,
                type: execItemType.string,
            }
        } else if (typeof item === 'function') {
            return {
                fn: item,
                args: [], // 需要带params
                ctx: null,
                type: execItemType.functional,
            }
        } else {
            return {
                fn: axios,
                args: [item],
                ctx: null,
                type: execItemType.axios,
            }
        }
    })
}

export function serializeOption(option: Option): OptionInstance {
    const format = [
        {
            fn: resultFormat,
            ctx: null,
            args: [],
        },
    ]
    if (typeof option.format === 'function') {
        format.push({
            fn: option.format,
            args: [],
            ctx: null,
        })
    }
    return {
        manual: option.manual || false, // 是否需要手动触发run
        onSuccess: option.onSuccess || noop, // 成功的回掉函数
        onError: option.onError || noop, // 失败的回掉函数
        loading: option.loading || false, // 默认loading的值
        data: option.data || null, // 初始化的数据
        params: option.params || [], // 默认的请求数据
        throttle: option.throttle || 0, // 节流时间（ms）
        debounce: option.debounce || 0, // 防抖时间（ms）
        format, //对结果进行转换
        async: typeof option.async === 'boolean' ? option.async : true, // serializeMethod是否串行，true：串行，false，并行
        cacheKey: option.cacheKey || '', // 对结果进行缓存, 全局, 预加载数据
        key: typeof option.key === 'function' ? option.key : null, // 可以实现多个loading
        refreshDeps: Array.isArray(option.refreshDeps) ? option.refreshDeps : null
    }
}

export function mergeArgs(methods: execItem[], option: OptionInstance, args: any): execItem[] {
    return methods.map((item) => {
        // api为string
        if (item.type === execItemType.string) {
            let runParams = {}
            if (typeof args === 'object' && args !== null) {
                runParams = args
            }
            ;(item.args as any)[0].params = Object.assign({}, option.params, runParams)
        } else if (item.type === execItemType.functional) {
            item.args = []; // 每次执行run，都需要重新合成参数
            (item.args as any).push(...toArray(args), ...toArray(option.params))
        } else if (item.type === execItemType.axios) {
            let runParams = {}
            if (typeof args === 'object' && args !== null) {
                runParams = args
            }
            const method = (item.args as any)[0].method ? (item.args as any)[0].method.toLocaleUpperCase() : 'GET'
            // todo 多种方法参数的支持
            if (method === 'GET') {
                ;(item.args as any)[0].params = Object.assign({}, option.params, (item.args as any)[0].params ? (item.args as any)[0].params : {}, runParams)
            } else if (method === 'POST') {
                ;(item.args as any)[0].data = Object.assign({}, option.params, (item.args as any)[0].data ? (item.args as any)[0].data : {}, runParams)
            }
        }
        return item
    })
}

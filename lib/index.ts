import { reactive, toRefs, watch } from 'vue'
import { serializeMethod, serializeOption, mergeArgs } from './serialization'
import { baseResult, api, Option, execType, execResult } from './type'
import { wrapperRun, toArray } from './helper'
import { executer, execute } from './executer';

const cache = Object.create(null)

export function useRequest(method: api | api[], options: Option = {}): baseResult {
    const serializedMethods = serializeMethod(method)
    const serializedOptions = serializeOption(options)

    const state = reactive({
        loading: serializedOptions.loading,
        data: serializedOptions.data,
        error: null,
        fetches: {},
    })

    const setLoading = async (status: boolean, key: string) => {
        if (serializedOptions.key) {
            if (key) {
                const fetcheState = (state.fetches as any)[key] || { loading: false, data: null, error: null }
                ;(state.fetches as any)[key] = Object.assign(fetcheState, {
                    loading: status,
                })
            }
        } else {
            state.loading = status
        }
    }

    const getKey = async (arg: any) => {
        if (serializedOptions.key) {
            const { data, error } = await execute(serializedOptions.key, toArray(arg)) // 或者key
            if (error === null && typeof data === 'string' && data) { // 必须为string类型才可以作为Object的key
                return data;
            } else {
                throw Error('key function return no a string')
            }
        }
        return ''
    }

    const setResult = async (result: execResult, key: string) => {
        // 对返回结果进行format
        serializedOptions.format[0].args = [result.data]
        const formatResult = await executer(serializedOptions.format, execType.asynchronous) // 对结果进行format

        // 如果存在key，重置数据
        if (serializedOptions.key) {
            if (key) { // 必须为string类型才可以作为Object的key
                const fetcheState = (state.fetches as any)[key] || { loading: false, data: null, error: null }
                ;(state.fetches as any)[key] = Object.assign(fetcheState, { data: formatResult.data, error: result.error })
            }
        } else {
            state.data = formatResult.data
            state.error = result.error

            // 重置cache
            if (serializedOptions.cacheKey) {
                cache[serializedOptions.cacheKey] = state.data
            }
        }

        // 执行回掉函数
        if (result.error) {
            serializedOptions.onError(state.error)
        } else {
            serializedOptions.onSuccess(state.data) // 请求的参数
        }

        await setLoading(false, key)
        return formatResult.data
    }

    // 初始化时，需要判断是否存在cachekey，如果存在，需要覆盖当前state.data
    if (serializedOptions.cacheKey && Object.prototype.hasOwnProperty.call(cache, serializedOptions.cacheKey)) {
        state.data = cache[serializedOptions.cacheKey]
    }

    const run = async (...arg: any) => {
        const key = await getKey(arg);

        await setLoading(true, key)

        // 需要在执行executer函数前执行初始赋值操作
        if (serializedOptions.cacheKey && Object.prototype.hasOwnProperty.call(cache, serializedOptions.cacheKey)) {
            state.data = cache[serializedOptions.cacheKey]
        }

        const result = await executer(mergeArgs(serializedMethods, serializedOptions, arg), serializedOptions.async ? execType.async : execType.asynchronous)
        return await setResult(result as any, key)
    }

    // todo
    const cancel = async () => {}

    // 保存配置信息
    const config = {}

    if (serializedOptions.manual === false) {
        run(serializedOptions.params)
    } else {
        Object.assign(config, { run: wrapperRun(serializedOptions, run), cancel })
    }

    if (serializedOptions.refreshDeps && serializedOptions.manual === false) {
        watch(serializedOptions.refreshDeps, (...args: any) => {
            run()
        })
    }

    return {
        ...toRefs(state),
        ...config,
    }
}

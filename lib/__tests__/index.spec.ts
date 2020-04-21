// import Vue from 'vue';
// import VueCompositionApi from '@vue/composition-api';
// Vue.use(VueCompositionApi);
import { useRequest } from '../index'
import * as sinon from 'sinon'
import { nextTick, ref } from 'vue'

const sleep = (timer: number) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), timer)
    })
}

let clock: any

beforeEach(() => {
    clock = sinon.useFakeTimers()
})

afterEach(() => {
    clock.restore()
})

describe('request', () => {
    it('Request basic', async () => {
        const fn = jest.fn()
        useRequest(fn, {
            onSuccess() {
                expect(fn).toHaveBeenCalledTimes(1)
            }
        })
    })

    it('Request default loading or data or manual', async () => {
        const test = async (args: any) => {
            return ['test', args].join('-')
        }
        let { loading, data, run } = useRequest(test, {
            manual: true,
            loading: true,
            data: 'test',
        })
        expect(loading.value).toBe(true)
        expect(data.value).toBe('test')
        await (run as Function)('1')
        expect(loading.value).toBe(false)
        expect(data.value).toBe('test-1')
    })

    // // 是否需要手动触发, 成功或者失败的回掉,
    it('request options onSuccess or onError', async () => {
        const test = async (hasError: boolean) => {
            if (hasError) {
                throw new Error('Error')
            } else {
                return 1
            }
        }
        let successData = null
        let errorInfo = null
        let { data, run, error } = useRequest(test, {
            manual: true,
            onSuccess: (val: any) => {
                successData = val
            },
            onError(val: any) {
                errorInfo = val
            },
        })
        await (run as Function)()
        expect(successData).toBe(data.value)
        await (run as Function)(true)
        // debugger
        expect(error.value).toBe(errorInfo)
    })

    // 请求的参数
    it('request options params for single', async () => {
        const test = async (args: any, num: any) => {
            return args + num
        }
        let { run } = useRequest(test, { manual: true, params: 3 })
        expect(await (run as Function)(1)).toBe(4)
    })

    it('request options params for multi', async () => {
        const normalFn = function (...arg: any) {
            return arg
        }
        let { run } = useRequest(normalFn, { manual: true, params: 10 })
        const result = await (run as Function)(1, 2, 3, 4)
        expect(result.length).toBe(5)
        expect(result[0]).toBe(1)
        expect(result[result.length - 1]).toBe(10)
    })

    // // 节流时间（ms）
    it('request options throttle', async () => {
        let count = 0
        const normalFn = function () {
            count++
            return count
        }
        const { run } = useRequest(normalFn, { manual: true, throttle: 100 })
        for (let i = 0; i < 101; i++) {
            clock.tick(1)
            ;(run as Function)()
        }
        await nextTick()
        await nextTick()
        expect(count).toBe(2)
    })

    // 防抖时间（ms）
    it('request options debounce', async () => {
        const normalFn = jest.fn().mockImplementation(async () => {})
        const { run } = useRequest(normalFn, { manual: true, debounce: 100 })
        for (let i = 0; i < 10; i++) {
            clock.tick(1)
            ;(run as Function)()
        }
        clock.tick(101)
        await nextTick()
        await nextTick()
        expect(normalFn).toHaveBeenCalledTimes(1)
    })

    // 对结果进行转换
    it('request options format', async () => {
        const normalFn = function (...arg: any) {
            return arg
        }
        let { run } = useRequest(normalFn, {
            manual: true,
            format: (args) => {
                return args.reduce(function (all: any, val: any) {
                    return all + val
                })
            },
        })
        const result = await (run as Function)(1, 2)
        expect(result).toBe(3)
    })

    it('request options format multi', async () => {
        const normalFn = function (...arg: any) {
            return arg
        }
        let { run } = useRequest(normalFn, {
            manual: true,
            params: 10,
            format: (args) => {
                return args.reduce(function (all: any, val: any) {
                    return all + val
                })
            },
        })
        const result = await (run as Function)(1, 2)
        expect(result).toBe(13)
    })

    // - async: enum[true, false], default: true // 对于传入数组的API，是否异步执行，true：异步，false，同步，如果为false，则会把上一个函数的返回值传给下一个函数作为参数
    it('request options async', async () => {
        const fn1 = async function (num: number = 1) {
            return num
        }
        const fn2 = function (num: number) {
            return num + 2
        }
        let { run } = useRequest([fn1, fn2], { manual: true, async: false })
        const result0 = await (run as Function)()
        expect(result0).toBe(3)
        const result = await (run as Function)(1)
        expect(result).toBe(3)
        const result2 = await (run as Function)(3)
        expect(result2).toBe(5)
    })

    // 对结果进行缓存, 全局, 预加载数据
    it('request options cacheKey', async () => {
        const fn = async function (args: any) {
            return args
        }

        const { run } = useRequest(fn, { manual: true, cacheKey: 'test' })
        expect(await (run as Function)('default')).toBe('default')
        const fn2 = function (args: any) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(args)
                }, 2000)
            })
        }

        const request = useRequest(fn2, { manual: true, cacheKey: 'test' })

        ;(request.run as Function)('normal').then(() => {
            expect(request.data.value).toBe('normal')
        })

        // 默认值为default, 初始化会check key的值
        expect(request.data.value).toBe('default')
    })

    // 可以实现多个loading
    it('request options key', async () => {
        const fn = async (key: any, name: any) => {
            await sleep(100)
            return `${key}-${name}`;
        }
        const { run, fetches } = useRequest(fn, { manual: true, key: id => id });

        (run as Function)('key', 'name').then(() => {
            expect((fetches as any).value.key.loading).toBe(false);
        })
        expect((fetches as any).value.key).toBe(undefined);

        function errorFn () {
            throw new Error('error')
            return '1'
        }
        try {
            const response = await useRequest(fn, { key: errorFn })
            console.log('response', response.data.value)
        } catch (error) {
            console.log('error', error)
        }
    })


    // 可以实现多个loading
    it('request options refreshDeps', async () => {
        const func = jest.fn().mockImplementation(async () => {});
        const dep = ref(0)
        useRequest(func, { refreshDeps: [dep] });
        await nextTick()
        await nextTick()
        expect(func).toHaveBeenCalledTimes(1)
        dep.value ++;
        await nextTick(); // dep的改变
        await nextTick(); // why
        await nextTick()
        expect(func).toHaveBeenCalledTimes(2)
    })
})

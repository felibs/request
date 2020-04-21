import { serializeMethod, serializeOption, mergeArgs } from '../serialization'
import axios from 'axios'
import { Method } from 'axios'

describe('serialization', () => {
    it('serializeMethod basic', async () => {
        async function foo() {
            return 'foo'
        }
        // 传入函数
        const methods1 = serializeMethod(foo)[0]
        expect(methods1.fn).toBe(foo)
        expect(methods1.ctx).toBe(null)
        expect((methods1.args as any).length).toBe(0)

        // 传入字符串
        const methods2 = serializeMethod('/path')[0]
        expect(methods2.ctx).toBe(null)
        expect((methods2.args as any)[0].url).toBe('/path')
        expect(methods2.fn).toBe(axios)

        // 传入object
        const methods3 = serializeMethod({ url: '/path', method: 'GET' })[0]
        expect(methods3.ctx).toBe(null)
        expect((methods3.args as any)[0].url).toBe('/path')
        expect((methods3.args as any)[0].method).toBe('GET')
        expect(methods3.fn).toBe(axios)

        // 传入arr
        const [methods4, methods5, methods6] = serializeMethod([foo, '/path', { url: '/path', method: 'GET' }])
        expect(methods4.fn).toBe(foo)
        expect(methods4.ctx).toBe(null)
        expect((methods4.args as any).length).toBe(0)

        expect(methods5.ctx).toBe(null)
        expect((methods5.args as any)[0].url).toBe('/path')
        expect(methods5.fn).toBe(axios)

        expect(methods6.ctx).toBe(null)
        expect((methods6.args as any)[0].url).toBe('/path')
        expect((methods6.args as any)[0].method).toBe('GET')
        expect(methods6.fn).toBe(axios)
    })

    it('serializeOption basic', async () => {
        const basic = serializeOption({})
        expect(basic.manual).toBe(false)
        expect(typeof basic.onSuccess === 'function').toBe(true)
        expect(typeof basic.onError === 'function').toBe(true)
        expect(basic.loading).toBe(false)
        expect(basic.data).toBe(null)
        expect(Object.entries(basic.params).length).toBe(0)
        expect(basic.throttle).toBe(0)
        expect(basic.debounce).toBe(0)
        expect(basic.format.length).toBe(1)
        expect(basic.async).toBe(true)
        expect(basic.cacheKey).toBe('')
        expect(basic.key).toBe(null)

        function placeholder() {}
        const all = serializeOption({
            manual: true, // 是否需要手动触发run
            onSuccess: placeholder, // 成功的回掉函数
            onError: placeholder, // 失败的回掉函数
            loading: true, // 默认loading的值
            data: { test: 1 }, // 初始化的数据
            params: { test: 1 }, // 默认的请求数据
            throttle: 500, // 节流时间（ms）
            debounce: 500, // 防抖时间（ms）
            format: placeholder, //对结果进行转换
            async: false, // serializeMethod是否串行，true：串行，false，并行
            cacheKey: 'test', // 对结果进行缓存, 全局, 预加载数据
            key: function test( name) { return name }, // 可以实现多个loading
        })
        expect(all.manual).toBe(true)
        expect(all.onSuccess.name).toBe('placeholder')
        expect(all.onError.name).toBe('placeholder')
        expect(all.loading).toBe(true)
        expect(all.data.test).toBe(1)
        expect((all.params as any).test).toBe(1)
        expect(all.throttle).toBe(500)
        expect(all.debounce).toBe(500)
        expect(all.format.length).toBe(2)
        expect(all.async).toBe(false)
        expect(all.cacheKey).toBe('test')
        expect((all.key as any).name).toBe('test')
    })

    it('mergeArgs basic', () => {
        function test() {}
        const methods = serializeMethod([
            'path',
            test,
            { url: 'path1', params: { paramsId: 1 }, data: { dataId: 2 } },
            { url: 'path2', method: 'POST' as Method, data: { dataId: 2 }, params: { paramsId: 1 } },
            { url: 'path3', data: { dataId: 2 } },
            { url: 'path4', method: 'POST' as Method, params: { paramsId: 1 } },
        ])

        const options = serializeOption({ params: { id: 0 } })

        const serialize1 = mergeArgs(methods, options, { runParmas: 2 })

        expect(serialize1.length).toBe(6)
        expect((serialize1[0].args as any)[0]).toMatchObject({ params: { runParmas: 2, id: 0 }, url: 'path', method: 'GET' })
        expect(serialize1[1].fn.name).toBe('test')
        expect(serialize1[1].args).toMatchObject(expect.arrayContaining([{ runParmas: 2 }, { id: 0 }]))
        expect((serialize1[2].args as any)[0]).toMatchObject({ params: { runParmas: 2, id: 0, paramsId: 1 }, data: { dataId: 2 }, url: 'path1', method: 'GET' })
        expect((serialize1[3].args as any)[0]).toMatchObject({ params: { paramsId: 1 }, data: { dataId: 2, runParmas: 2, id: 0 }, url: 'path2', method: 'POST' })
        expect((serialize1[4].args as any)[0]).toMatchObject({ params: { runParmas: 2, id: 0 }, data: { dataId: 2 }, url: 'path3', method: 'GET' })
        expect((serialize1[5].args as any)[0]).toMatchObject({ params: { paramsId: 1 }, data: { runParmas: 2, id: 0 }, url: 'path4', method: 'POST' })


        const serialize2 = mergeArgs(methods, options, null);
        expect(serialize2.length).toBe(6)
        expect((serialize2[0].args as any)[0]).toMatchObject({ params: { id: 0 }, url: 'path', method: 'GET' })
        expect(serialize2[1].args).toMatchObject(expect.arrayContaining([{ id: 0 }]))
        expect((serialize2[2].args as any)[0]).toMatchObject({ params: { id: 0, paramsId: 1 }, data: { dataId: 2 }, url: 'path1', method: 'GET' })
        expect((serialize2[3].args as any)[0]).toMatchObject({ params: { paramsId: 1 }, data: { dataId: 2, id: 0 }, url: 'path2', method: 'POST' })
        expect((serialize2[4].args as any)[0]).toMatchObject({ params: { id: 0 }, data: { dataId: 2 }, url: 'path3', method: 'GET' })
        expect((serialize2[5].args as any)[0]).toMatchObject({ params: { paramsId: 1 }, data: { id: 0 }, url: 'path4', method: 'POST' })
    })
})

import { execute, asynchronousExecuter } from '../lib/executer';

describe('wrapper', () => {
    it('core execute function for promise or normal', async () => {
        const asyncFn = async () => 1
        const normal = function () {
            return 'normal'
        }
        const promiseFn = () => Promise.resolve(1)
        const error = function () {
            throw new Error('error')
        }
        const genError = () => Promise.reject(1)

        expect(await execute(asyncFn)).toMatchObject({ data: 1, error: null })
        expect(await execute(normal)).toMatchObject({ data: 'normal', error: null })
        expect(await execute(promiseFn)).toMatchObject({ data: 1, error: null })
        expect(await execute(error)).toMatchObject({ data: null, error: new Error('error') })
        expect(await execute(genError)).toMatchObject({ data: null, error: 1 })
        
        // 添加参数
        const asyncFn1 = async (num: number) => 1 + num
        const normal1 = function (str: string) {
            return 'normal' + str
        }
        const promiseFn1 = (num: number) => Promise.resolve(1 + num)
        
        expect(await execute(asyncFn1, [-1])).toMatchObject({ data: 0, error: null })
        expect(await execute(normal1, ['-ok'])).toMatchObject({ data: 'normal-ok', error: null })
        expect(await execute(promiseFn1, [-1])).toMatchObject({ data: 0, error: null })
    })

    it('core asynchronousExecuter function', async () => {
        const normal = function () {
            return 'normal'
        }
        const error = function () {
            throw new Error('error')
        }
        const fnList = [ { fn: error, ctx: null, args: [] }, { fn: normal, ctx: null, args: [] }, ]
        const result = await asynchronousExecuter(fnList);
        expect(result).toMatchObject({ error: new Error('error'), data: null })
    })

    // it('core function executer', async () => {
    //     function fn (params: any): any {
    //         return params
    //     }
    //     expect((await executer([{ fn }])).length).toBe(1)
    //     expect((await executer([{ fn }]))[0]).toBe(undefined)
    //     expect((await executer([{ fn, args: [1] }]))[0]).toBe(1)
    //     const arr = await executer([{ fn, args: [[1]] }]);
    //     expect(arr[0][0]).toBe(1)

    //     // 带作用域执行
    //     const ctx = {
    //         name: 'ctx-name',
    //         fn: function () {
    //             return this ? this.name : undefined
    //         }
    //     }
    //     expect((await executer([{ fn: ctx.fn }]))[0]).toBe(undefined)
    //     expect((await executer([{ fn: ctx.fn, ctx: ctx }]))[0]).toBe('ctx-name')

    //     // 异步数组执行
    //     const ctx2 = {
    //         name: 'ctx-name',
    //         fn: function (parmas: any) {
    //             return parmas + '-' + this.name
    //         }
    //     }
    //     expect((await executer([{ fn: ctx.fn }], execType.asynchronous))).toBe(undefined)
    //     expect((await executer([{ fn: ctx.fn }, { fn: ctx2.fn, ctx: ctx}], execType.asynchronous))).toBe('undefined-ctx-name')
    // })
})

// import { execute, executer } from '../executer';
// import { execType } from '../type'

import { execute } from '../executer';


describe('wrapper', () => {

    it('core execute function for promise or normal', async () => {
        const asyncFn = async () => 1;
        const normal = function() { return 'normal' };
        const promiseFn = () => Promise.resolve(1)

        expect((await execute(asyncFn)).data).toBe(1)
        expect((await execute(normal)).data).toBe('normal')
        expect((await execute(promiseFn)).data).toBe(1)

        // 添加参数
        const asyncFn1 = async (num: number) => 1 + num;
        const normal1 = function(str: string) { return 'normal' + str };
        const promiseFn1 = (num: number) => Promise.resolve(1 + num)
        expect((await execute(asyncFn1, [-1])).data).toBe(0)
        expect((await execute(normal1, ['-ok'])).data).toBe('normal-ok')
        expect((await execute(promiseFn1, [-1])).data).toBe(0)

        const scope = {
            num: 1,
            asyncFn2: async (num: number)  => {
                return 1 + num
            },
            normal2: function() {
                return this.num + 1
            },
            promiseFn2: function() {
                return Promise.resolve(this.num + 1)
            }
        }
        expect((await execute(scope.asyncFn2, [-1], scope)).data).toBe(0)
        expect((await execute(scope.normal2, null, scope)).data).toBe(2)
        expect((await execute(scope.promiseFn2, null, scope)).data).toBe(2)
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
import { type, isPromise, resultFormat, wrapperRun } from '../helper';
import { serializeOption } from '../serialization'

import * as sinon from 'sinon'

let clock: any

beforeEach(() => {
    clock = sinon.useFakeTimers()
})

afterEach(() => {
    clock.restore()
})

describe('wrapper', () => {
    // function type
    it('commonly used functions type', () => {
        expect(type('')).toBe('String')
        expect(type(null)).toBe('Null')
        expect(type(undefined)).toBe('Undefined')
        expect(type(1)).toBe('Number')
        expect(type({})).toBe('Object')
        expect(type(Promise.resolve())).toBe('Promise')
        // expect(type(async () => {})).toBe('AsyncFunction') // ts会转换async函数
        expect(type(function () {})).toBe('Function')
    })

    // function isPromise
    it('commonly used functions isPromise', async () => {
        expect(isPromise(Promise.resolve())).toBe(true)
        expect(isPromise(new Promise((resolve) => resolve(1)))).toBe(true)
        const fn = () => {}
        fn.then = () => {}
        fn.catch = () => {}
        expect(isPromise(fn)).toBe(true)
        expect(isPromise(() => {})).toBe(false)
    })

    it('format result function resultFormat', () => {
        expect(resultFormat([1])).toBe(1)
        expect(resultFormat([1, 2]).length).toBe(2)
    })

    it('function wrapperRun', async () => {
        // 普通函数
        const func = jest.fn().mockImplementation(async () => {});
        wrapperRun(serializeOption({}), func)()
        expect(func).toHaveBeenCalledTimes(1);
        wrapperRun(serializeOption({}), func)()
        expect(func).toHaveBeenCalledTimes(2);

        // 防抖函数
        const debounceFn = jest.fn().mockImplementation(async () => {});
        const execDebounceFn = wrapperRun(serializeOption({ debounce: 500 }), debounceFn)
        execDebounceFn()
        expect(debounceFn).toHaveBeenCalledTimes(0);
        clock.tick(400);
        expect(debounceFn).toHaveBeenCalledTimes(0);
        clock.tick(100);
        expect(debounceFn).toHaveBeenCalledTimes(1);

        for (let i = 0; i < 100; i ++ ) {
            execDebounceFn()
        }
        clock.tick(1003);
        expect(debounceFn).toHaveBeenCalledTimes(2);

        // 节流函数
        const throttleFn = jest.fn().mockImplementation(async () => {});
        const execThrottleFn = wrapperRun(serializeOption({ throttle: 100 }), throttleFn)
        execThrottleFn()
        expect(throttleFn).toHaveBeenCalledTimes(1);
        clock.tick(100);
        expect(throttleFn).toHaveBeenCalledTimes(1);
        for(let i = 0; i < 101; i++) {
            clock.tick(1);
            execThrottleFn();
        }
        expect(throttleFn).toHaveBeenCalledTimes(3); // execThrottleFn会执行2次
    })

    it('function wrapperRun args', async () => {
        // 普通函数传参数
        const normalFn = jest.fn().mockImplementation(function normal(arg1: any, arg2: any) {
            return arg1 + arg2;
        });
        expect(wrapperRun(serializeOption({}), normalFn)('1', '1')).toBe('11')
        const normalAsyncFn = jest.fn().mockImplementation(async function normal(arg1: number, arg2: number) {
            return arg1 + arg2;
        });

        expect(await wrapperRun(serializeOption({}), normalAsyncFn)(1, 1)).toBe(2);

        // 防抖函数传参
        let debounce = 0
        const debounceFn = jest.fn().mockImplementation(async function normal(arg1: number, arg2: number) {
            debounce = arg1 + arg2
        });

        wrapperRun(serializeOption({ debounce: 100 }), debounceFn)(1, 2)
        clock.tick(101);
        expect(debounce).toBe(3)

        // 节流函数传参数
        let throttle = 0
        const throttleFn = jest.fn().mockImplementation(async function normal(arg1: number, arg2: number) {
            throttle += arg1 + arg2
        });
        const throttleWrapFn = wrapperRun(serializeOption({ throttle: 100 }), throttleFn)
        for (let i = 0; i < 101; i++) {
            clock.tick(1);
            throttleWrapFn(1, 2)
        }
        clock.tick(10);
        expect(throttle).toBe(6)
    })
})

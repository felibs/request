import { execItem, execType, execResult } from "./type";
import { type, isPromise } from "./helper";

function asyncEach(asyncs: Array<any>, next: Function, callback: Function) {
    if (asyncs.length === 0) return callback(null, asyncs);
    const transformed = new Array(asyncs.length);
    let count = 0;
    let returned = false;
    asyncs.forEach(function (item, index) {
        next(item, function (error: any, transformedItem: any) {
            if (returned) return;
            if (error) {
                returned = true;
                return callback(error, null);
            }
            transformed[index] = transformedItem;
            count += 1;
            if (count === asyncs.length) return callback(null, transformed);
        });
    });
}

// 执行同步或者异步函数
export async function execute(
    fn: Function,
    args: Array<any> = []
): Promise<execResult> {
    let result: execResult = { data: null, error: null };
    if (type(fn) === "AsyncFunction") {
        try {
            result.data = await fn(...args);
        } catch (error) {
            result.error = error;
        }
    } else {
        try {
            let response = fn(...args);
            result.data = isPromise(response) ? await response : response;
        } catch (error) {
            result.error = error;
        }
    }
    return result;
}

export function asyncExecuter(fnList: Array<execItem>): Promise<execResult> {
    return new Promise((resolve) => {
        asyncEach(
            fnList,
            function next(item: execItem, callbck: Function) {
                execute(item.fn, item.args).then(({ data, error }) => {
                    callbck(error, data);
                });
            },
            function result(error: any, data: any) {
                resolve({
                    data,
                    error,
                });
            }
        );
    });
}

export async function asynchronousExecuter(
    fnList: Array<execItem>
): Promise<execResult> {
    let result: execResult = { data: null, error: null };

    const fns = fnList.slice();
    let execItem = fns.shift();
    let hasError = false;

    while (execItem && !hasError) {
        const { data, error } = await execute(execItem.fn, execItem.args);
        if (error) {
            hasError = true;
            result.error = error;
            result.data = null;
        }
        result.data = data;
        execItem = fns.shift();
        if (execItem) {
            (execItem as any).args = [data]; // 上段的执行结果给下个函数作为参数
        }
    }
    return result;
}

export async function executer(
    fnList: Array<execItem>,
    type: execType = execType.async
): Promise<execResult> {
    let result: execResult = { data: null, error: null };
    if (type === execType.async) {
        result = await asyncExecuter(fnList);
    } else {
        result = await asynchronousExecuter(fnList);
    }
    return result;
}

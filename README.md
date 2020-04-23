<p align="center">
  <a href="https://github.com/felibs/request/actions"><img src="https://github.com/felibs/reqeust/workflows/BUILD/badge.svg?branch=master" alt="Build Status"></a>
  <!-- <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/dm/vue.svg" alt="Downloads"></a> -->
  <a href="https://www.npmjs.com/package/@felibs/request"><img src="https://img.shields.io/npm/v/@felibs/request.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue"><img src="https://img.shields.io/npm/l/@felibs/request.svg" alt="License"></a>
</p>


## hooks for vue3.x, easy to use request or async function, inspired by umijs/hooks


# 对于 request 的设计
const result = request(api, option)

api: 
- '/v1/get/xxx', 内部使用axios, 默认get方法
- object: { uri, method}
- promise函数，可自定义
- Array，数组，对array进行处理同步/异步处理

option:
- manual: enum[true, false], default: false // 是否需要手动触发
- onSuccess: Function, default: noop, // 成功回掉
- onError: Function, default: noop, // 失败回掉
- loading: enum[true, false], default: false // 默认loading的值
- data: any, default: null // 默认的数据
- params: object, default: {}, // 请求的参数
- throttle: number, default: 0, // 节流时间（ms）
- debounce: number, default: 0, // 防抖时间（ms）
- format: Function， default: noop, //对结果进行转换
- async: enum[true, false], default: true // 对于传入数组的API，是否异步执行，true：异步，false，同步，如果为false，则会把上一个函数的返回值传给下一个函数作为参数
- cacheKey: string, // 对结果进行缓存, 全局, 预加载数据
- key: key => key, // 可以实现多个loading
- refreshDeps: array<ref>
- delay: number // todo
- cancelToken: // todo

result:
- loading: enum[true, false]  // 是否在请求中
- data: any, // 请求的结果，
- run: manual为true是手动触发的函数
- error: Object，错误信息
- cancel： Function， // todo

关于params
1、如果api为function， 则此function会接收多个参数，前部分为run的参数集合，最后一个为params
2、如果api为string, 则


demo1:
自动执行

```javascript

import { useRequest } from '@felibs/request'

export default {
    setup() {
        const getUser = async () => {};
        const { data, loading, error } = request(getUser);
        
        if (error) {
            return <p>error</p>
        } else if (loading) {
            return <p>loading</p>
        } else {
            return <p>user：{data}</p>
        }
    },
}
```

demo2:
手动执行

```javascript
import { useRequest } from "@felibs/request"

export default {
    setup() {
        const { loading, run, cancel, data } = useRequest('/v1/data/getButtonText', {
            manual: true,
        }, { config })
        return (
            <button onClick={run} loading={ loading }>{ data }</button>
            <button onClick={cancel} loading={ loading }>{ data }</button>
        )
    }
}
```

demo3:
防抖函数

```javascript
import { useRequest } from '@felibs/request'

export default {
    setup() {
        const { loading, run, data } = useRequest('/v1/getUserByName', {
            manual: true,
            debounce: 500,
        })
        return <button onClick={run} loading={loading}> { data } </button>
    },
}
```

demo4:
节流函数
```javascript
import { useRequest } from '@felibs/request'

export default {
    setup() {
        const { loading, run, data } = useRequest('/v1/getUserByName', {
            manual: true,
            throttle: 500,
        })
        return <button onClick={run} loading={loading}>{ data }</button>
    },
}
```



demo5:
format对结果进行format

```javascript
import { useRequest } from '@felibs/request'

export default {
    setup() {
        const { loading, run, data } = useRequest('/v1/getUserByName', {
            manual: true,
            format: (result) => {
                return result.map(item => item)
            }
        })
        return <button onClick={run} loading={loading}>{ data }</button>
    },
}
```

demo6:
async: 对传入的接口进行串行或者并行
default: true

true：异步，false，同步，如果为false，则会把上一个函数的返回值传给下一个函数作为参数


```javascript
import { useRequest } from '@felibs/request'

export default {
    setup() {
        const { loading, run, data } = request(['/v1/getUserByName', '/v1/getUserByName2'], {
            manual: true,
            async: false,
        })
        // data为数组，数组的顺序跟返回的顺序一致
        return <button onClick={run} loading={loading}>{ data }</button>
    },
}
```

demo7:
cacheKey: 全局的预加载


```javascript
import { useRequest } from '@felibs/request'

export default {
    setup() {
        const { loading, run, data } = useRequest('/v1/getUserByName2', {
            manual: true,
            cacheKey: 'globalUser',
        })
        // data为存储数据，等真正的接口返回时，它会动态改变
        return <button onClick={run} loading={loading}>{ data }</button>
    },
}
```


demo8:
key: 可以多个动态key

```javascript
import { useRequest } from '@felibs/request'

export default {
    setup() {
        const { loading, run, data } = useRequest('/v1/getUserByName2', {
            manual: true,
            cacheKey: 'globalUser',
        })
        // data为存储数据，等真正的接口返回时，它会动态改变
        return <button onClick={run} loading={loading}>{ data }</button>
    },
}
```


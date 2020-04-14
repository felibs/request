// import { reactive, computed } from 'vue';
// import debounce from 'loadsh/debounce'
// import throttle from 'loadsh/throttle'

import { reactive, computed } from '@vue/composition-api';
import { serializeMethod, serializeOption } from './serialization'
import { baseResult, Method, Options } from './types';

export function Request(method: Method, options?: Options): baseResult {
    // promise array
    const methods = serializeMethod(method);
    const serializedOptions = serializeOption(options)

    console.log('metyhods', methods)
    console.log('serializedOptions', serializedOptions)

    const state = reactive({
        _loading: false,
        _data: null,
        _error: null,
    })

    const run = () => {
        state._loading = true;
    }

    const cancel = () => {
        state._loading = false;
    }

    return {
        loading: computed(() => state._loading),
        data: computed(() => state._data),
        run,
        error: computed(() => state._error),
        cancel,
    }
}


export function wrapper(params:number) {
    return 1
}
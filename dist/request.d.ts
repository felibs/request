import { AxiosRequestConfig } from 'axios/index.d';
import { Ref } from '@vue/reactivity/dist/reactivity.d';

declare type api = AxiosRequestConfig | string | ((...arg: any) => any);

declare interface baseResult {
    loading: Ref<boolean>;
    data: Ref<any>;
    run?: (...arg: any) => any;
    error: Ref<any>;
    cancel?: () => void;
    fetches?: Ref<any>;
}

declare type Option_2 = {
    manual?: boolean;
    onSuccess?: (...arg: any) => any;
    onError?: (...arg: any) => any;
    loading?: boolean;
    data?: any;
    params?: Object | [];
    throttle?: number;
    debounce?: number;
    format?: (...arg: any) => any;
    async?: boolean;
    cacheKey?: string;
    key?: ((...arg: any) => string) | null;
    refreshDeps?: Array<Ref> | null;
};

export declare function useRequest(method: api | api[], options?: Option_2): baseResult;

export { }

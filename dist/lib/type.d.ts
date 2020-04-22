import { AxiosRequestConfig } from 'axios/index.d';
import { Ref } from '@vue/reactivity/dist/reactivity.d';
export interface baseResult {
    loading: Ref<boolean>;
    data: Ref<any>;
    run?: (...arg: any) => any;
    error: Ref<any>;
    cancel?: () => void;
    fetches?: Ref<any>;
}
export declare type api = AxiosRequestConfig | string | ((...arg: any) => any);
export declare type Option = {
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
export declare type OptionInstance = {
    manual: boolean;
    onSuccess: (...arg: any) => any;
    onError: (...arg: any) => any;
    loading: boolean;
    data: any;
    params: Object | [];
    throttle: number;
    debounce: number;
    format: Array<execItem>;
    async: boolean;
    cacheKey: string;
    key: ((...arg: any) => string) | null;
    refreshDeps: Array<Ref> | null;
};
export declare enum runType {
    normal = "normal",
    debounce = "debounce",
    throttle = "throttle"
}
export declare enum execType {
    async = "async",
    asynchronous = "asynchronous"
}
export declare enum execItemType {
    string = "string",
    axios = "axios",
    functional = "functional"
}
export declare type execItem = {
    fn: Function;
    ctx?: any;
    args?: Array<any>;
    type?: execItemType;
    initArgs?: Array<any>;
};
export declare type execResult = {
    data: any;
    error: any;
};
//# sourceMappingURL=type.d.ts.map
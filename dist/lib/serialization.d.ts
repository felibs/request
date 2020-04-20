import { api, Option, OptionInstance, execItem } from './type';
export declare function serializeMethod(method: api | api[]): execItem[];
export declare function serializeOption(option: Option): OptionInstance;
export declare function mergeArgs(methods: execItem[], option: OptionInstance, args: any): execItem[];

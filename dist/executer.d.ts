import { execItem, execType, execResult, execItemType } from './type';
export declare function execute(fn: Function, args?: any, ctx?: Object, exectype?: execItemType): Promise<execResult>;
export declare function asyncExecuter(fnList: Array<execItem>): Promise<execResult>;
export declare function asynchronousExecuter(fnList: Array<execItem>): Promise<execResult>;
export declare function executer(fnList: Array<execItem>, type?: execType): Promise<execResult>;

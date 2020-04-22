import { execItem, execType, execResult } from './type';
export declare function execute(fn: Function, args?: Array<any>): Promise<execResult>;
export declare function asyncExecuter(fnList: Array<execItem>): Promise<execResult>;
export declare function asynchronousExecuter(fnList: Array<execItem>): Promise<execResult>;
export declare function executer(fnList: Array<execItem>, type?: execType): Promise<execResult>;
//# sourceMappingURL=executer.d.ts.map
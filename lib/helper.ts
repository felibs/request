export function toPromise() {}

export function noop() {}

export function isPromise(fn: any): boolean {
    return true
}

export function type(p: any): string {
    return Object.prototype.toString.call(p).slice(8, -1)
}

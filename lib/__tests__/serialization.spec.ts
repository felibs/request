import { serializeMethod } from '../serialization'

describe('serialization', () => {
    it('serializeMethod basic', async () => {
        async function test() {
            return 'test'
        }
        const methods = serializeMethod(test)
        expect(methods[0]).toBe(test)
        debugger
        // methods.map(item => item())
        // expect(result).toBe('test')
    })
})
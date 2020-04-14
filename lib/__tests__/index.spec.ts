import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
Vue.use(VueCompositionApi);
import { Request } from '../index'

describe('heler', () => {
    it('Request test', () => {
        const test = async () => {
            return 'test'
        }
        let { loading, run, data } = Request(test);
        expect(data.value).toBe(null);
        // debugger
        expect(loading.value).toBe(false)
        run()
        expect(loading.value).toBe(true)
    }) 
})
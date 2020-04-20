import * as path from 'path'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'

const builds = {
    'cjs-dev': {
        outFile: 'request.js',
        format: 'cjs',
        mode: 'development',
    },
    'cjs-prod': {
        outFile: 'request.min.js',
        format: 'cjs',
        mode: 'production',
    },
    'umd-dev': {
        outFile: 'request.umd.js',
        format: 'umd',
        mode: 'development',
    },
    'umd-prod': {
        outFile: 'request.umd.min.js',
        format: 'umd',
        mode: 'production',
    },
    es: {
        outFile: 'request.module.js',
        format: 'es',
        mode: 'development',
    },
}

function getAllBuilds() {
    return Object.keys(builds).map((key) => genConfig(builds[key]))
}

function genConfig({ outFile, format, mode }) {
    const isProd = mode === 'production'
    return {
        input: './lib/index.ts',
        output: {
            file: path.join('./dist', outFile),
            format: format,
            globals: {
                axios: 'axios',
                vue: 'Vue',
            },
            exports: 'named',
            name: format === 'umd' ? 'RequestHooks' : undefined,
        },
        external: ['axios', 'vue'],
        plugins: [
            typescript({
                typescript: require('typescript'),
            }),
            require('@rollup/plugin-commonjs')(),
            require('@rollup/plugin-json')(),
            require('rollup-plugin-node-builtins')(),
            resolve(),
            replace({ 'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development') }),
            isProd && terser(),
        ].filter(Boolean),
        onwarn: (msg, warn) => {
            if (!/Circular/.test(msg)) {
                warn(msg)
            }
        },
    }
}

let buildConfig

if (process.env.TARGET) {
    buildConfig = genConfig(builds[process.env.TARGET])
} else {
    buildConfig = getAllBuilds()
}

export default buildConfig

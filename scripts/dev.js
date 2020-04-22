const execa = require('execa')

const args = require('minimist')(process.argv.slice(2))
const targets = args._
const formats = args.formats || args.f
const sourceMap = args.sourcemap || args.s

execa(
    'rollup',
    [
        '-wc',
        '--environment',
        [
            `TARGET:${targets}`, `FORMATS:${formats || 'global'}`, sourceMap ? `SOURCE_MAP:true` : ``].filter(Boolean).join(','),
    ],
    {
        stdio: 'inherit',
    }
)

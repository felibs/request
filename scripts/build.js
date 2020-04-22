const execa = require('execa')
const args = require('minimist')(process.argv.slice(2))
const target = args._
const formats = args.formats || args.f
const sourceMap = args.sourcemap || args.s

await execa(
    'rollup',
    [
        '-c',
        '--environment',
        [
            `COMMIT:${commit}`,
            `NODE_ENV:${env}`,
            `TARGET:${target}`,
            formats ? `FORMATS:${formats}` : ``,
            buildTypes ? `TYPES:true` : ``,
            prodOnly ? `PROD_ONLY:true` : ``,
            sourceMap ? `SOURCE_MAP:true` : ``,
        ]
            .filter(Boolean)
            .join(','),
    ],
    { stdio: 'inherit' }
)

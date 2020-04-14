const path = require('path')

const config = {
    input: path.resolve(__dirname, 'lib/index.ts'),
    output: {
        file: 'dist/index.js'
    },
}

export default config;
module.exports = {
    preset: 'ts-jest',
    globals: {
        __VERSION__: require('./package.json').version,
    },
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'lcov', 'text'],
    collectCoverageFrom: ['lib/*.ts'],
    watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    rootDir: __dirname,
    testMatch: ['<rootDir>/lib/__tests__/**/*spec.[jt]s?(x)'],
    testPathIgnorePatterns: process.env.SKIP_E2E
        ? // ignore example tests on netlify builds since they don't contribute
          // to coverage and can cause netlify builds to fail
          ['/node_modules/', '/examples/__tests__']
        : ['/node_modules/'],
}

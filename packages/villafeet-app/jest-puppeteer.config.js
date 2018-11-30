module.exports = {
    preset: 'jest-puppeteer',
    testMatch: ['**/test/e2e/**/*__Spec.js'],
    server: {
        command: 'yarn run dev --open false',
        debug: true,
        launchTimeout: 240000,
        host: 'localhost',
        port: 8000,
        protocol: 'http',
        usedPortAction: 'kill'
    },
    launch: {
        dumpio: true,
        headless: process.env.headless==='true',
        timeout: 60000,
        devtools: false
    },
    browserContext: 'default'
};

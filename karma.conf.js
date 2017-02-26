module.exports = (config) => {
    const webpackConfig = require('./webpack.test.conf');

    config.set({
        basePath: '',
        files: [
            {pattern: './karma-test-shim.conf.js', watched: false}
        ],
        preprocessors: {
            './karma-test-shim.conf.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {stats: 'errors-only'},
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        plugins: [
            'karma-webpack',
            'karma-sourcemap-loader',
            'karma-jasmine',
            'karma-spec-reporter',
            'karma-phantomjs-launcher',
        ],
        reporters: ['spec'],
        singleRun: true,
        autoWatch: false,
        colors: true,
        logLevel: config.LOG_INFO
    });
};


const webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        basePath: '',
        autoWatch: false,
        files: [
            { pattern: 'tests/**/*.js' }
        ],
        preprocessors: {
            'src/**/*.js': ['webpack', 'sourcemap'],
            'tests/**/*.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        client: {
            captureConsole: true
        },
        reporters: ['dots'],
        singleRun: true,
        webpackMiddleware: {
            noInfo: true
        },
        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-sourcemap-loader',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher'
        ],
        browserNoActivityTimeout: 60000
    });
};

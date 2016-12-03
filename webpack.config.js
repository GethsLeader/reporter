// basic imports
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
// plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');

// default paths
const distPath = path.resolve(__dirname, './dist');
const srcPath = path.resolve(__dirname, './src');
const libsPath = path.resolve(__dirname, './node_modules');

// default environment variables
const prodEnv = process.env.WEBPACK_ENV;

// applications environment configuration
const applicationsEnvironment = {
    production: prodEnv === 'production',
    libsDist: 'libs',
    componentsDist: 'comps',
    fileProvider: {
        maxFileSize: 5000000,
        allowedFileTypes: [],
        allowedFileExtensions: ['xlsx', 'xls', 'ods']
    }
};

fs.writeFileSync(path.join(srcPath, 'components', 'environment', 'config.ts'),
    '// This file was created on project building phase. Check build configuration for more information.\n'
    + 'export const config: any = ' + JSON.stringify(applicationsEnvironment) + ';',
    'utf8');

// basic webpack configuration
const webpackConfig = {
    entry: {
        'reporter-application': ['babel-polyfill', path.join(srcPath, 'applications', 'reporter', 'application')]
    },
    output: {
        path: distPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {test: /\.ts$/, exclude: /node_modules/, loaders: ['babel-loader', 'ts-loader']}
        ]
    },
    plugins: [
        // Angular 2 "the request of a dependency is an expression" errors fix
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),
        new CopyWebpackPlugin(
            [
                { // entry point html
                    from: path.join(srcPath, 'applications', 'reporter', 'index.html'),
                    to: path.join(distPath, 'index.html')
                },
                { // bootstrap css library
                    from: path.join(libsPath, 'bootstrap', 'dist', 'css', 'bootstrap.min.css'),
                    to: path.join(distPath, applicationsEnvironment.libsDist, 'bootstrap.min.css')
                },
                { // components html files
                    context: path.join(srcPath, 'components'),
                    from: path.join('**/*.html'),
                    to: path.join(distPath, applicationsEnvironment.componentsDist)
                }
            ],
            {
                copyUnmodified: false
            })
    ]
};

if (prodEnv === 'production') {
    webpackConfig.plugins = webpackConfig.plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false
        })
    ]);
} else {
    webpackConfig.devtool = 'source-map';
    webpackConfig.plugins = webpackConfig.plugins.concat([]);
}

module.exports = webpackConfig;
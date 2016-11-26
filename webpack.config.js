// basic imports
const webpack = require('webpack');
const path = require('path');
// plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');

// default paths
const distpath = path.resolve(__dirname, './dist');
const srcpath = path.resolve(__dirname, './src');

// basic configuration
const config = {
    entry: {
        'test-application': ['babel-polyfill', path.join(srcpath, 'applications/test/application')]
    },
    output: {
        path: distpath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [
            {test: /\.ts$/, exclude: /node_modules/, loaders: ['babel-loader', 'ts-loader']},
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.html/, loader: 'html-loader?minimize=true'},
            {test: /\.css$/, loader: 'css-loader'},
            {test: /\.(gif|png|jpe?g)$/i, loader: 'file-loader?name=dist/images/[name].[ext]'}
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
                //{context: path.join(srcpath, 'applications'), from: '**/*.html', to: distpath},
                {
                    from: path.join(srcpath, 'applications', 'test', 'index.html'),
                    to: path.join(distpath, 'test.html')
                }
            ],
            {
                copyUnmodified: false
            })
    ]
};

if (process.env.WEBPACK_ENV === 'production') {
    config.plugins = config.plugins.concat([
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false
        }),
        new webpack.DefinePlugin({
            'WEBPACK_ENV': 'production'
        })
    ]);
} else {
    config.devtool = 'source-map';
    config.plugins = config.plugins.concat([
        new webpack.DefinePlugin({
            'WEBPACK_ENV': 'development'
        })
    ]);
}

module.exports = config;
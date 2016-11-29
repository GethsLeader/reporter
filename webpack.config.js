// basic imports
const webpack = require('webpack');
const path = require('path');
// plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');

// default paths
const distpath = path.resolve(__dirname, './dist');
const srcpath = path.resolve(__dirname, './src');
const libspath = path.resolve(__dirname, './node_modules');

// basic configuration
const config = {
    entry: {
        'reporter-application': ['babel-polyfill', path.join(srcpath, 'applications/reporter/application')]
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
                    from: path.join(srcpath, 'applications', 'reporter', 'index.html'),
                    to: path.join(distpath, 'index.html')
                },
                {
                    from: path.join(libspath, 'bootstrap', 'dist', 'css', 'bootstrap.min.css'),
                    to: path.join(distpath, 'libs', 'bootstrap.min.css')
                },
                {
                    context: path.join(srcpath, 'components'),
                    from: path.join('**/*.html'),
                    to: path.join(distpath, 'comps')
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
        })
    ]);
} else {
    config.devtool = 'source-map';
    config.plugins = config.plugins.concat([]);
}

module.exports = config;
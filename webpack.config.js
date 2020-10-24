const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/dist')
    },
    mode: 'production',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/dist',
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ''
                        },
                    },
                    // 'style-loader',
                    'css-loader',
                    'sass-loader'
                ],
                exclude: /node_modules\/(?!(bootstrap)\/).*/,
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                loader: 'url-loader?limit=8129&name=images/[name].[ext]'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new OptimizeCSSAssetsPlugin({})
    ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimize: true,
    }
}
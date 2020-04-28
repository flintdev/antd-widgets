const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const tsImportPluginFactory = require('ts-import-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: __dirname,
    mode: 'development',
    entry: {
        index: "./example/index.tsx",
        plugin: "./src/library.ts",
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve('./docs/'),
        filename: "[name].js",
        libraryTarget: 'umd',
        library: 'antd-widgets'
    },
    // important! move react and react-dom as external dependencies to avoid invalid hook calls error
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".yaml", ".less"],
        alias: {
            src: path.resolve('./src'),
            example: path.resolve('./example'),
            dist: path.resolve('./dist'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(jsx|tsx|js|ts)$/,
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  getCustomTransformers: () => ({
                    before: [ tsImportPluginFactory({
                        libraryName: 'antd',
                        libraryDirectory: 'lib',
                        style: true
                      }) ]
                  }),
                  compilerOptions: {
                    module: 'es2015'
                  }
                },
                exclude: /node_modules/
              },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(txt|yaml)$/,
                use: 'raw-loader'
            },
            {
                test: /\.(css|less)$/,
                include: /node_modules/,
                use: [{
                  loader: 'style-loader' // creates style nodes from JS strings
                }, {
                  loader: 'css-loader', // translates CSS into CommonJS
                }, {
                  loader: 'less-loader', // compiles Less to CSS
                  options: { lessOptions: {javascriptEnabled: true, sourceMap: true }},
                }],
              },
              {
                test: /\.(css|less)$/,
                exclude: /node_modules/,
                use: [{
                  loader: 'style-loader' // creates style nodes from JS strings
                }, {
                  loader: 'css-loader', // translates CSS into CommonJS
                  options: {
                    modules: {
                        localIdentName: "[name]__[local]___[hash:base64:5]",
                    },	
                    importLoaders: 2,											
                    sourceMap: true
                  }
                },
                {
                    loader: 'less-loader', // compiles Less to CSS
                    options: { lessOptions: {javascriptEnabled: true, sourceMap: true }},
                  }],
              }
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./example/index.html",
            filename: "./index.html"
        })
    ]
};
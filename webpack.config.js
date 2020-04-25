const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
    context: __dirname,
    mode: 'development',
    entry: {
        index: "./example/index.tsx",
        plugin: "./src/library.ts",
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve('./assets/'),
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
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader",
                    options: {
                        lessOptions: {javascriptEnabled: true}
                    }
                }]
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./example/index.html",
            filename: "./index.html"
        })
    ]
};
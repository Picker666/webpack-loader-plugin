const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HelloForDonePlugin = require('./plugins/hello-for-done-plugin');
const HelloAsyncPlugin = require('./plugins/hello-async-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
    },
    mode: 'development',
    plugins: [
      new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        }),
        new HelloForDonePlugin({
          name: 'HelloForDonePlugin',
          someWolds: 'everybody...'
        }),
        new HelloAsyncPlugin({
          name: 'HelloAsyncPlugin',
          wolds: 'Picker 666'
        })
      ],
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'markdownLoader.js?cache=true',
                        options: {
                          cacheable: false
                        }
                    }
                ]
            }
        ]
    },
    resolveLoader: {
        modules: [
            'node_modules', path.resolve(__dirname, 'loaders')
        ]
    },
    target: "web",
    devServer: {
        port: 9000,
        static: {
            directory: path.join(__dirname, 'public')
        },
        hot: true
    }
}
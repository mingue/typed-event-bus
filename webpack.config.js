const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/EventBus.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.join(__dirname, '/src/'),
                use: ['ts-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
}
'use strict';

module.exports = {
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.json']
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts',
                exclude: [/node_modules/]
            }
        ],
    },
    stats: { colors: true, reasons: true },
    debug: false
};

const { resolve } = require('path')

module.exports = {

    devServer: {
        host: '0.0.0.0',
        port: 8081,
        proxy: {
            '/model': {
                target: 'http://localhost:8888/',
                changeOrigin: true,
                pathRewrite: {
                    "^/model": ""
                }
            },
        }
    },

    configureWebpack: {

        resolve: {
            alias: {
                '@': resolve('src'),
            }
        }
    },
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    }
}
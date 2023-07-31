const { resolve } = require("path");

module.exports = {
  publicPath: "./",
  devServer: {
    host: "0.0.0.0",
    port: 8081,
    proxy: {
      "/model": {
        target: "http://localhost:8888/",
        changeOrigin: true,
        pathRewrite: {
          "^/model": "",
        },
      },
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
};

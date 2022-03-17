module.exports = {
  devServer: {
    proxy: {
      "/apiServer": {
        target: "https://api.haleygg.kr/",
        changeOrigin: true,
        pathRewrite: {
          "^/apiServer": ""
        }
      }
    }
  }
}
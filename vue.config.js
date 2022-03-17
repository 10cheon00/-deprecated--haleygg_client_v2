module.exports = {
    devServer: {
        proxy: {
            "/server": {
                target: "https://api.haleygg.kr/",
                changeOrigin: true,
                pathRewrite: {
                    "^/server": ""
                }
            }
        }
    }
}
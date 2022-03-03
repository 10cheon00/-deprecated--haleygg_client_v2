module.exports = {
    devServer: {
        proxy: {
            "/server": {
                target: "http://127.0.0.1:8000/",
                changeOrigin: true,
                pathRewrite: {
                    "^/server": ""
                }
            }
        }
    }
}
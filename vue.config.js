const port = process.env.port || process.env.npm_config_port || 9528
module.exports = {
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        // target: 'https://blog.zhangxc.cn/',
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true,
      }
    }
  }

}
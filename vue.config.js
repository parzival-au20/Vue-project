const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',// Backend sunucusu URL'si
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  lintOnSave: false, // Linter hatalarını kaydetmeyi devre dışı bırak
  configureWebpack: {
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src'),
      },
    },
  },
});
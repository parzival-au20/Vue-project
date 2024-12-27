const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: '/',
  devServer: {
    proxy: 'http://localhost:4000', // Backend sunucusu URL'si
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

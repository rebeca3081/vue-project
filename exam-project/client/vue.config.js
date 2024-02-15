const { defineConfig } = require('@vue/cli-service')
const target = 'http://localhost:3000';

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave : false, // .vue파일명 대문자 2개 구성 깨기
  devServer : { // CROS해결을 위해 서버쪽에 origin 변경이 일어나야함
    proxy : {
      '^/api' : {
        target,
        changeOrigin : true,
        ws : false,
        pathRewrite : { '^/api' :'/' }
      }
    }
  }
})

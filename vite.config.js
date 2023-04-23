import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default ({ mode }) => {
  //参数mode为开放模式或生产模式
  //console.log(mode);  // development or product
  const env = loadEnv(mode, process.cwd());   // 获取.env文件里定义的环境变量
  //console.log(env);   //变量在命令行里打印出来

  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    server: {
      // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
      host: "0.0.0.0",
      port: env.VITE_APP_PORT,
      //port: viteEnv.VITE_PORT,
      open: env.VITE_APP_OPEN, //是否自动打开浏览器
      cors: true,
      // 跨域代理配置
      proxy: {
        "/api": {
          target: env.VITE_SERVER_URL, //
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, "")
        }
      }
    },
  })
}

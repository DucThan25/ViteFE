import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
function resolve (dir) {
  return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  // const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [vue()],
    // define: {
    //   // disableOTP: false,
    //   // __APP_ENV__: env.APP_ENV,
    //   // 'import.meta.env.envPrefix': "VNPT",
    // },
    envPrefix: ["VNPT",],
    resolve: {
      alias: {
        '@': resolve('src'),
      },
      extensions: ['.js', '.vue', '.json'],
    }
  }
})

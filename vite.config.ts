import { fileURLToPath, URL } from 'node:url'
import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const { resolve } = require('path')

export default ({ command, mode }: ConfigEnv): UserConfig => {
  console.log(loadEnv(mode, process.cwd()))
  return ({
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('src', import.meta.url)),
        '@@': fileURLToPath(new URL('example/src', import.meta.url)),
      },
    },
    plugins: [vue()],
  })
}

// @ts-ignore

import { fileURLToPath, URL } from 'node:url'
const { resolve } = require('path')
import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default ({ command, mode }: ConfigEnv): UserConfig => {
  return {
    resolve: {
      alias: {
        '@':fileURLToPath(new URL('src',import.meta.url)),
        '@@': fileURLToPath(new URL('example/src', import.meta.url)),
      }
    },
    plugins: [vue()],
  }
}

// 引入Vue createApp
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import { AppConfig } from './config/AppConfig'

// ELement Plus 中文

// Vue初始化
const app = createApp(App)
// ELement Plus 初始化
app.use(ElementPlus, { zIndex: 3000, locale: zhCn })
export default app

console.clear()

console.log(`%cHdaes %c©Vvet-oop %c${AppConfig.version}`,
    `padding:20px 10px 10px 0px;
    font-size:24px;
    color:#f39800;`,
    'font-size:24px;color:#0083c0;',
    'font-size:14px;color:#333;')
console.groupCollapsed('%cRuntime', 'font-size:12px;color:#333;font-weight:300;')
console.log(`%cVue\t\t\t\t%cv${app.version}`,
  'font-size:12px;color:#999;',
  'font-size:12px;color:#333;')
console.log(`%cElement Plus\t%cv${ElementPlus.version}`,
  'font-size:12px;color:#999;',
  'font-size:12px;color:#333;')
console.log(import.meta.env)
console.groupEnd()
console.groupCollapsed('%cConsole', 'font-size:12px;color:#333;font-weight:300;')

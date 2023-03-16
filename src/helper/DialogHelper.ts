import { type App, createApp, type Component } from 'vue'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
/**
 * # 弹窗助手类
 * @author Hdaes
 */
export class DialogHelper {
  static async build<T>(view: Component, param: Record<string, any>): Promise<T> {
    const parentNode = document.createElement('div')
    const domId = `dialog_${Math.random()}`
    parentNode.setAttribute('id', domId)
    let app: App<Element> | undefined

    // 卸载dom方法
    const unmout = () => {
      if (app) {
        app.unmount()
        document.body.removeChild(parentNode)
        app = undefined
      }
    }
    return new Promise<T>((resolve, reject) => {
      if (app) return

      const dialogParam = {
        onConfirm: async (c: T) => {
          unmout()
          resolve(c)
        },
        onCancel: () => {
          unmout()
          reject
        },
        ...param,
      }

      /**
       * 创建App实例
       */
      app = createApp(view, dialogParam)
      app.use(ElementPlus, { locale: zhCn })

      // 注册全局组件
      Object.keys(Icons).forEach(key => {
        if (app) {
          app.component(key, Icons[key as keyof typeof Icons])
        }
      })
      document.body.appendChild(parentNode)
      app.mount(parentNode)
    })
  }

  /**
     * # 创建一个弹窗
     * @param
     * @returns
     */
  static async show(view:Component, param?: unknown): Promise<unknown> {
    return this.build(view, { param })
  }
}

import { type App, createApp, type Component, type PropType } from 'vue'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import type { WetBaseModel } from '../model/WetBaseModel'
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
    const unmount = () => {
      if (app) {
        app.unmount()
        document.body.removeChild(parentNode)
        app = undefined
      }
    }
    console.log(param)
    return new Promise<T>((resolve, reject) => {
      if (app) return

      const dialogParam = {
        onConfirm: async (C: T) => {
          unmount()
          resolve(C)
        },
        onCancel: () => {
          unmount()
          reject()
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
      // 挂载组件
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

/**
 * # 无参数弹窗配置
 */
export function dialogProps() {
  return {
    /**
     * # 弹窗的确认按钮被点击事件
     * 如果传入了form表单的ref实体对象, 则校验通过之后才会回调此方法
     */
    onConfirm: {
      type: Function,
      default: () => () => {
        console.log('On Confirm')
      },
    },
    /**
     * # 弹窗的取消或关闭按钮被点击事件
     */
    onCancel: {
      type: Function,
      default: () => () => {
        console.log('On Cancel')
      },
    },
  }
}

/**
 * # 弹窗配置id参数
 */
export function dialogPropsId() {
  return Object.assign(
    dialogProps(), {
      param: {
        type: Number,
        default: () => 0,
      },
    },
  )
}

/**
 * # 使用实体的DialogProps配置
 * - T: Param的类型
 * @param value [可选]默认参数
 */
export function dialogPropsParam<T extends WetBaseModel>(value: any = null) {
  return Object.assign(
    dialogProps(), {
      param: {
        type: Object as PropType<T>,
        default: value,
      },
    },
  )
}

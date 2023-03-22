import { BaseRouterHelper } from '@/helper/RouterHelper'

export class RouterHelper extends BaseRouterHelper {
  constructor() {
    // 获取页面组件地址 根据实际创建名字来
    const modules = import.meta.glob('../views/**/*.vue')
    super(modules)
  }
}

import type { IPageConfig } from '../interface/IPageConfig'
import { WetPageConfig } from '../config/WetPageConfig'
import { ClassTransformerHelper } from '../helper/ClassTransformerHelper'
/**
 *  # 页面配置key
 */
const entityConfigMetaKey = Symbol('pageConfig')

/**
 * # 页面配置装饰器
 * @param
 * @returns
 */
export function PageConfig(config?: IPageConfig) {
  return (target: any) => {
    if (!config) {
      config = new WetPageConfig()
    }
    Reflect.defineMetadata(entityConfigMetaKey, config, target)
  }
}

/**
 * # 获取页面配置装饰器
 * @param target 目标类
 * @returns
 */
export function getPageConfig(target: any): WetPageConfig {
  return ClassTransformerHelper.parse(Reflect.getOwnMetadata(entityConfigMetaKey, target), WetPageConfig) || new WetPageConfig()
}

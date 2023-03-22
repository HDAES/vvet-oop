import { AppConfig } from '../AppConfig'
import { WetNotification } from '../tips/WetNotification'
import type { WetMenu } from '../model/WetMenu'
import { ConsoleHelper } from './ConsoleHelper'
/**
 * # 路由助手类
 * @author Hdaes
 */

export class BaseRouterHelper {
     modules!: Record<string, () => Promise<unknown>>

     constructor(modules: Record<string, () => Promise<unknown>>) {
       this.modules = modules
     }

     /**
     * # 😄将AirMenu菜单列表初始化到Vue路由中
     * @param menuList 菜单列表
     * @param parentRouter [可选] 父级路由 默认 admin
     * @param menuCacheKey [可选] 缓存Key 默认 AirPowerMenuList
     */
     initVueRouter(menuList: WetMenu[], parentRouter = 'admin', menuCacheKey = 'AirPowerMenuList'): void {
       localStorage.setItem(menuCacheKey, JSON.stringify(menuList))
       if (!AppConfig.isTimeout) {
         this.addRouterAsync(menuList, parentRouter)
         this.reloadCacheMenuList(menuCacheKey)
       }
     }

     /**
     * # 😄将菜单添加到Vue路由中
     * @param menuList 菜单列表
     * @param parentRouter 父级路由名称
     * @returns
     */
     addRouterAsync(menuList: WetMenu[], parentRouter: string): void {
       if (!AppConfig.router) {
         new WetNotification().setTitle('配置错误')
         .setMessage('请先注入当前路由对象')
         .error()
         return
       }
       menuList.forEach((item) => {
         if (!item.children || item.children.length === 0) {
           if (AppConfig.router) {
             if (!item.name || !item.path || !item.component) {
               ConsoleHelper.error('路由初始化失败，缺少参数')
             } else {
               AppConfig.router.addRoute(parentRouter, {
                 path: item.path,
                 name: item.id,
                 meta: {
                   name: item.name,
                 },
                 component: this.modules[`../views${item.component}.vue`],
               })
             }
           }
         } else {
           this.addRouterAsync(item.children, parentRouter)
         }
       })
     }

     /**
     * # 😄重载缓存中的路由
     * @param menuCacheKey 提供缓存的Key
     * @param menuList [可选]子菜单,好兄弟,你不用传。
     * @returns
     */
     reloadCacheMenuList(menuCacheKey: string, menuList?: WetMenu[]): void {
       if (AppConfig.router) {
         if (!menuList && localStorage.getItem(menuCacheKey)) {
           menuList = JSON.parse(localStorage.getItem(menuCacheKey) || '[]')
         }
         if (menuList === undefined) {
           return
         }
         for (const item of menuList) {
           if (item.children.length > 0) {
             this.reloadCacheMenuList(menuCacheKey, item.children)
             continue
           }
           // eslint-disable-next-line no-restricted-globals
           const locationPathName = location.pathname
           if (item.path === locationPathName) {
             localStorage.removeItem(menuCacheKey)
             AppConfig.router.replace(locationPathName)
             break
           }
         }
       }
     }
}

import { HttpStatus } from '@/http/HttpStatus'
import { DateTimeFormatterEnum } from './emum/DateTimeFormatterEnum'

/**
 * # App 配置
 */
export class AppConfig {
    /**
     * # 当前版本号
     */
    static readonly version = 'v0.0.1'

    /**
     * # 接口根地址
     */
    static apiRootUrl = import.meta.env.VITE_APP_API_URL || '/api/';

    /**
     * # AccessToken在LocalStorage存储的key
     */
    static accessTokenKey = 'access_token';

    /**
     * # 获取AccessToken
     * @returns AccessToken
     */
    static getAccessToken(): string {
      return localStorage.getItem(this.accessTokenKey) || ''
    }

    /**
    * # 后端默认返回code 的key
    */
    static defaultHttpCodeKey = 'code'

    /**
    * # 后端返回message的key
    */
    static defaultHttpMessageKey = 'message'

    /**
    * # 后端返回data的key
    */
    static defaultHttpDataKey = 'data'

    /**
     * # 全局http请求返回成功状态码
     * 默认 200
     */
    static defaultHttpSuccessCode = HttpStatus.OK

    /**
     * # 全局http请求返回登录状态码
     * 默认 401
     */
    static defaultHttpUnauthorizedCode = HttpStatus.UNAUTHORIZED

    /**
     * # 😄标准错误提示内容
     */
    static errorMessage = '系统发生了一些错误，请稍候再试 :)';

    /**
     * # 😄标准错误提示标题
     */
    static errorTitle = '发生错误';

    /**
     * # 默认的表格空数据兜底字符串
     * \@TableField 装饰器中可以单独配置 ```emptyValue```,
     */
    static defaultTableEmptyValue = '--'

    /**
     * # 默认的表格数组显示分割字符
     * \@TableField 装饰器中可以单独配置 ```arraySplitor```,
     */
    static defaultArraySplitor = '，'

    /**
     * # 默认的格式化时间
     * 如设置,则未格式化方式的地方将默认使用此方式
     * ```
     * AppConfig.defaultDateTimeFormatter = AirDateTimeFormatter.YYYY_MM_DD
     * ```
     */
    static defaultDateTimeFormatter = DateTimeFormatterEnum.YYYY_MM_DD_HH_mm_ss

    /**
    * # 静态资源文件地址
    */
    static staticUrl = ''

    /**
     * # 权限列表
     */
    static permissionList: string[] = []

    /**
     * # 是否有权限
     * @param permission 权限标识
     * @returns
     */
    static hasPermission(permission: string): boolean {
      return this.permissionList.includes(permission)
    }
}

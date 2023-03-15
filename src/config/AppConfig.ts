import { HttpStatus } from '@/http/HttpStatus'

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
}

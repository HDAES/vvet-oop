import type { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, AxiosResponseHeaders, Method } from 'axios'
import axios from 'axios'
import type { Ref } from 'vue'
import { HttpContentType } from './HttpContentType'
import { HttpMethod } from './HttpMethod'
import { AppConfig } from '../AppConfig'
import { WetNotification } from '../tips/WetNotification'
/**
 * # 网络请求
 * @author Hdaes
 */

export class WetHttp {
  /**
  * # 基础返回对象
  */
  private axiosResponse!: Promise<AxiosResponse<any, any>>;

  /**
  * # 基础请求配置
  */
  private axiosRequestConfig!: AxiosRequestConfig;

  /**
  * # 请求路径
  */
  private httpUrl = '';

  /**
  * # 是否隐藏自动错误提示
  */
  private flagIgnoreError = false;

  /**
     * # 配置一个Loading的Ref对象
     */
  private loading!: Ref<boolean>

  constructor(url?: string) {
    this.axiosRequestConfig.method = <Method>HttpMethod.POST
    this.axiosRequestConfig.baseURL = AppConfig.apiRootUrl
    this.axiosRequestConfig.headers = {
      'content-type': HttpContentType.JSON,
    }
    const accessToken = AppConfig.getAccessToken()
    if (accessToken) {
      this.axiosRequestConfig.headers.authorization = accessToken
    }
    if (url) {
      this.httpUrl = url
    }
  }

  /**
   * # 设置loading状态
   * @param loading Ref<boolean>
   * @returns API
   */
  setLoading(loading: Ref<boolean>): this {
    this.loading = loading
    return this
  }

  /**
   * # 设置请求路径
   * @param url: string
   * @returns Api
   */
  setHttpUrl(url: string): this{
    this.httpUrl = url
    return this
  }

  /**
   * # 设置请求头
   * @param header
   * @returns API
   */
  setHttpHeader(header: Record<string, string>): this{
    if (this.axiosRequestConfig.headers && this.axiosRequestConfig.headers['content-type']) {
      header = { ...header, 'content-type': this.axiosRequestConfig.headers['content-type'] }
    }
    this.axiosRequestConfig.headers = header as AxiosRequestHeaders
    return this
  }

  /**
   * # 添加一个请求头
   * @param key 请求头key
   * @param value 请求头value
   * @returns API
   */
  addHttpHeader(key: string, value: string):this{
    this.axiosRequestConfig.headers = this.axiosRequestConfig.headers || {} as AxiosResponseHeaders
    this.axiosRequestConfig.headers[key] = value
    return this
  }

  /**
   * # 设置请求方法
   * @param method 请求方法
   * @returns API
   */
  setHttpMethod(method: HttpMethod):this{
    this.axiosRequestConfig.method = <HttpMethod>method
    return this
  }

  /**
   * # 设置不自动弹出错误
   * @returns
   */
  withOutError():this{
    this.flagIgnoreError = false
    return this
  }

  /**
   * # 设置不携带token
   * @returns
   */
  withOutToken(): this {
    if (this.axiosRequestConfig.headers && this.axiosRequestConfig.headers.authorization) {
      delete this.axiosRequestConfig.headers.authorization
    }
    return this
  }

  /**
   * # 发送请求
   * @param body 请求实体
   * @returns
   */
  send(body?: any): Promise<any> {
    // 设置loading状态
    if (this.loading) {
      this.loading.value = true
    }
    // 判断请求方法
    switch (this.axiosRequestConfig.method) {
      case HttpMethod.POST:
        this.axiosResponse = axios.post(this.httpUrl, body, this.axiosRequestConfig)
        break
      case HttpMethod.PUT:
        this.axiosResponse = axios.put(this.httpUrl, body, this.axiosRequestConfig)
        break
      case HttpMethod.PATCH:
        this.axiosResponse = axios.patch(this.httpUrl, body, this.axiosRequestConfig)
        break
      case HttpMethod.DELETE:
        this.axiosResponse = axios.delete(this.httpUrl, this.axiosRequestConfig)
        break
      default:
        this.axiosResponse = axios.get(this.httpUrl, this.axiosRequestConfig)
    }
    return new Promise((resolve, reject) => {
      this.axiosResponse.then((res) => {
        if (this.loading) {
          this.loading.value = false
        }
        switch (res.data[AppConfig.defaultHttpCodeKey]) {
          case AppConfig.defaultHttpSuccessCode:
            resolve(res.data[AppConfig.defaultHttpCodeKey])
            break
          case AppConfig.defaultHttpUnauthorizedCode:
            console.log('未登录')
            break
          default:
            if (!this.flagIgnoreError) {
              new WetNotification().setTitle(AppConfig.errorTitle)
              .setMessage(res.data[AppConfig.defaultHttpMessageKey] || AppConfig.errorMessage)
              .error()
            }
            reject(res.data)
        }
      }).catch(e => {
        if (this.loading) {
          this.loading.value = false
        }
        if (!this.flagIgnoreError) {
          new WetNotification().setTitle(AppConfig.errorTitle)
          .setMessage(AppConfig.errorMessage)
        }
        reject(e)
      })
    })
  }

  /**
   * # 发送post请求
   * @param body 请求参数
   * @returns
   */

  post(body?: any): Promise<any> {
    this.setHttpMethod(HttpMethod.POST)
    return this.send(body)
  }

  /**
   * # 发送get请求
   * @param
   * @returns
   */
  get(params?: Record<string, any>): Promise<any> {
    if (params) {
      const queryArray = []
      for (const key in params) {
        queryArray.push(`${key}=${encodeURIComponent(params[key])}`)
      }
      if (this.httpUrl.includes('?')) {
        this.httpUrl += `&${queryArray.join('&')}`
      } else {
        this.httpUrl += `?${queryArray.join('&')}`
      }
    }
    this.setHttpMethod(HttpMethod.GET)
    return this.send()
  }
}

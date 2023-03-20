import type { Ref } from 'vue'
import { VvetHttp } from '../http'
/**
 * # 请求基本类
 * @author Hdaes
 */
export abstract class WetAbstractService {
    /**
    * # Api 地址
    */
    abstract baseUrl: string;

    /**
    * # loading的Ref 对象
    */
    protected loading!: Ref<boolean>

    /**
     * #
     * @param
     * @returns
     */
    constructor(loading?: Ref<boolean>) {
      if (loading) {
        this.loading = loading
      }
    }

    /**
     * # 发起http请求
     * @param url 请求地址 customBaseUrl 根目录
     * @returns
     */
    api(url: string, customBaseUrl?: string): VvetHttp {
      url = `${customBaseUrl || this.baseUrl}/${url}`
     
      if (this.loading) {
        return new VvetHttp(url).setLoading(this.loading)
      }
      return new VvetHttp(url)
    }
}

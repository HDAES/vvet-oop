import { AppConfig } from '../AppConfig'

/**
 * # 😄文件助手类
 * @author Hamm
 */
export class FileHelper {
  /**
     * # 😄字节数转可读文件大小
     * @param size 字节数
     * @param fractionDigits 小数位数
     * @returns
     */
  static getFileSizeFriendly(size: number, fractionDigits = 2): string {
    const partSize = 1024
    const unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let res = ''
    for (let i = 0; i < unitArr.length; i++) {
      if (size < partSize ** (i + 1)) {
        res = `${(size / (partSize ** i)).toFixed(fractionDigits)}${unitArr[i]}`
        break
      }
      res = 'LARGE FILE'
    }
    return res
  }

  /**
     * # 😄获取静态文件的绝对地址
     * @param url 地址
     * @returns 绝对地址
     */
  static getStaticFileUrl(url: string): string {
    if (!url) {
      return ''
    }
    if (url.includes('https://') || url.includes('http://')) {
      return url
    }
    return AppConfig.staticUrl + url
  }
}

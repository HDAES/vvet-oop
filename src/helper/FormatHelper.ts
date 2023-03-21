/**
 * # 格式转换助手
 * @author Hdaes
 */
export class FormatHelper {
  /**
     * # 数字类型转换为带px单位字符串
     * @param value 需要转换得值
     * @param suffix 后缀
     * @returns ** + px
     */
  static toPixel(value: string | number | null, suffix = 'px'): string {
    if (value) return typeof value === 'string' && Number.isNaN(Number(value)) ? value : `${value + suffix}`
    return ''
  }
}

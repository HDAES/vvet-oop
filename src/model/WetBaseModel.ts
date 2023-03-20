import { instanceToPlain } from 'class-transformer'
import { getClassName, getFieldName, getDescription } from '../decorator/CustomName'
import type { WetTableFieldConfig } from '../config/WetTableFieldConfig'
import { getTableFieldConfig } from '../decorator/TableField'

/**
 * 基础模型
 * 模型基类包含一些常用模型的操作
 * @author Hdaes
 */
export class WetBaseModel {
  /**
   * # 合并实体字段
   * @param obj
   * @returns
   */
  copy(obj: Record<string, any>): this {
    return Object.assign(this, obj)
  }

  /**
   * # 获取类的可阅读名字
   * 可使用 @ClassName 装饰器修饰 如无修饰 则直接返回类名
   * @returns 类的可读名字
   */
  getCustomClassName(): string {
    return getClassName(this.constructor) || this.constructor.name
  }

  /**
   * # 获取属性的可阅读名字
   * @param fieldKey 属性名
   * @returns 属性的可读名字
   * 可使用 @FieldName 装饰器修饰 如无修饰 则直接返回属性名
   */
  getCustomFieldName(fieldKey: string): string {
    return getFieldName(this, fieldKey)
  }

  /**
   * # 获取属性的描述
   * @param fieldKey 属性名
   * @returns 属性的描述
   * 可使用 @Description 装饰器修饰 如无修饰 则直接返回空字符串
   */
  getCustomDescription(fieldKey: string): string {
    return getDescription(this, fieldKey)
  }

  /**
   * # 😄按别名转换为普通的JSON对象
   * @returns JSON对象
   */
  toSourceObject(): Record<string, any> {
    return instanceToPlain(this)
  }

  /**
   * # 按别名转换为原始JSON字符串
   * @returns JSON字符串
   */
  toSourceString(): string {
    return JSON.stringify(instanceToPlain(this))
  }

  /**
   * # 😄获取表格字段的配置列表
   * @param fieldNameList 字段列表
   * @returns
   */
  getCustomTableFieldConfig(fieldKey: string): WetTableFieldConfig | null {
    return getTableFieldConfig(this, fieldKey)
  }
}

import { WetBaseModel } from '../model/WetBaseModel'
import type { ITableFieldConfig } from '../interface/ITableFieldConfig'
import { WetTableFieldConfig } from '../config/WetTableFieldConfig'
import { ClassTransformerHelper } from '../helper/ClassTransformerHelper'
import { getFieldName } from './CustomName'

/**
 * # 表格字段key
 */
const tableFieldMetaKey = Symbol('tableFieldConfig')

/**
 * # 表格字段列表key
 */
const tableFieldListMetaKey = Symbol('tableFieldConfigList')

/**
 * # 为属性标记表格字段
 * @param tableFieldConfig ITableFieldConfig
 * @returns
 */
export function TableField<T extends WetBaseModel>(tableFieldConfig?: ITableFieldConfig) {
  return (target: T, key: string) => {
    if (!tableFieldConfig) {
      tableFieldConfig = new WetTableFieldConfig()
    }
    tableFieldConfig.key = key
    const list = Reflect.getOwnMetadata(tableFieldListMetaKey, target) || []
    list.push(key)
    Reflect.defineMetadata(tableFieldListMetaKey, list, target)
    Reflect.defineMetadata(tableFieldMetaKey, tableFieldConfig, target, key)
  }
}

/**
 * # 获取表格属性的配置信息
 * @param WetTableFieldConfig
 * @returns
 */
export function getTableFieldConfig(target: any, fieldKey: string): WetTableFieldConfig | null {
  let tableFieldConfig = Reflect.getOwnMetadata(tableFieldMetaKey, target, fieldKey)
  if (!tableFieldConfig) {
    const superClass = Object.getPrototypeOf(target)
    if (superClass.constructor.name === WetBaseModel.name) {
      return null
    }
    tableFieldConfig = getTableFieldConfig(superClass, fieldKey)
  }
  if (!tableFieldConfig) {
    return null
  }

  tableFieldConfig = ClassTransformerHelper.parse(tableFieldConfig, WetTableFieldConfig)
  if (!tableFieldConfig.label || tableFieldConfig.label === tableFieldConfig.key) {
    tableFieldConfig.label = getFieldName(target, fieldKey)
  }
  return tableFieldConfig
}

/**
 * # 获取标记表格字段
 * @param target 目标对象
 */
export function getCustomTableFieldNameList<E extends WetBaseModel>(target: E): string[] {
  let list: string[] = Reflect.getOwnMetadata(tableFieldListMetaKey, target) || []
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name !== WetBaseModel.name) {
    list = list.concat(getCustomTableFieldNameList(superClass))
  }
  return list
}

/**
 * # 获取字段标记的表格字段配置列表
 * @param fieldNameList 字段列表
 * @returns
 */
export function getCustomTableFieldList<E extends WetBaseModel>(target: E, fieldNameList: string[]) {
  const tableFieldConfigList: WetTableFieldConfig[] = []
  const keyList = []
  if (fieldNameList.length === 0) {
    fieldNameList = getCustomTableFieldNameList(target)
  }
  for (const fieldName of fieldNameList) {
    if (keyList.indexOf(fieldName) >= 0) {
      continue
    }
    const config = getTableFieldConfig(target, fieldName)
    if (config) {
      keyList.push(config.key)
      tableFieldConfigList.push(config)
    }
  }
  return tableFieldConfigList
}

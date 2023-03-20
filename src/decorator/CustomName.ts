import { WetBaseModel } from '@/model/WetBaseModel'

/**
 * # 自定义类名元数据key
 */
const customClassNameMetaKey = Symbol('customClassName')

/**
 * # 自定义属性名元数据key
 */
const customFieldNameMetaKey = Symbol('customFieldName')

/**
 * # 自定义描述元数据key
 */
const customFieldDescription = Symbol('customFieldDescription')

/**
 * # 设置类名
 * @param className 类名
 * @returns Function
 */
export function ClassName(className: string) {
  return (target: any) => {
    Reflect.defineMetadata(customClassNameMetaKey, className, target)
  }
}

/**
 * # 获取类的名字
 * @param target 目标类
 * @returns
 */
export function getClassName(target: any): string {
  return Reflect.getOwnMetadata(customClassNameMetaKey, target) || target.name
}

/**
 * # 标记一个可读名称
 * @param fieldName 字段名字
 * @returns
 */
export function FieldName(fieldName: string) {
  return (target: any, key: string) => {
    Reflect.defineMetadata(customFieldNameMetaKey, fieldName, target, key)
  }
}

/**
 * # 获取对象的属性可读名称
 * @param target 目标对象
 * @param fieldKey 属性名
 * @returns
 */
export function getFieldName<E extends WetBaseModel>(target: E, fieldKey: string): string {
  let fieldName = Reflect.getOwnMetadata(customFieldNameMetaKey, target, fieldKey)
  if (fieldName) {
    return fieldName
  }
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === WetBaseModel.name) {
    return fieldKey
  }
  fieldName = getFieldName(superClass, fieldKey)
  return fieldName
}

/**
 * # 标记一个可读字段描述
 * @param description 字段描述
 * @returns
 */
export function Description(description: string) {
  return (target: any, key: string) => {
    Reflect.defineMetadata(customFieldDescription, description, target, key)
  }
}
/**
 * # 获取对象的属性可读描述
 * @param target 目标对象
 * @param fieldKey 属性名
 * @returns
 */
export function getDescription<E extends WetBaseModel>(target: E, fieldKey: string): string {
  let fieldName = Reflect.getOwnMetadata(customFieldDescription, target, fieldKey)
  if (fieldName) {
    return fieldName
  }
  const superClass = Object.getPrototypeOf(target)
  if (superClass.constructor.name === WetBaseModel.name) {
    return ''
  }
  fieldName = getDescription(superClass, fieldKey)
  return fieldName
}

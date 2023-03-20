import { Expose } from 'class-transformer'
import type { IFieldConfig } from '../interface/IFieldConfig'

/**
 * # 字段配置基类
 */
export class FieldConfig implements IFieldConfig {
    @Expose() key?: string

    @Expose() label?: string
}

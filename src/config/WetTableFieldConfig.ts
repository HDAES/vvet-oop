import { Expose } from 'class-transformer'
import type { ITableFieldConfig } from '../interface/ITableFieldConfig'
import type { DateTimeFormatter } from '../emum/DateTimeFormatter'
import { AppConfig } from '../AppConfig'
import { FieldConfig } from './FieldConfig'
/**
 * # 表格实体类
 * @author Hdaes
 */
export class WetTableFieldConfig extends FieldConfig implements ITableFieldConfig {
    @Expose() hide = false

    @Expose() removed = false

    @Expose() width?: number | string

    @Expose() minWidth?: number | string

    @Expose() fixed?: 'left' | 'right';

    @Expose() orderNumber = 1

    @Expose() dateTimeFormatter?: DateTimeFormatter | string

    @Expose() sortable?: boolean | 'custom' = false

    @Expose() align?: 'right' | 'left' | 'center' = 'left'

    @Expose() suffixText?: string

    @Expose() isCopyField?= false

    @Expose() isImage?= false

    @Expose() imageWidth?= 60

    @Expose() imageHeight?= 60

    @Expose() emptyValue?= AppConfig.defaultTableEmptyValue

    @Expose() arraySeparator?= AppConfig.defaultArraySplitor
}

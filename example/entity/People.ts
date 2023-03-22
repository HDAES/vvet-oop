import { WetBaseModel } from '@/model/WetBaseModel'
import { ClassName, Description, FieldName } from '@/decorator/CustomName'
import { TableField } from '@/decorator/TableField'
import { BaseEntity } from '../base/BaseEntity'
import { PageConfig } from '@/decorator/PageConfig'

@ClassName('示例类')
@PageConfig({
  hideFieldFilter: true
  })
export class People extends BaseEntity {
    @FieldName('姓名')
    @TableField({
        orderNumber: 1,
        isCopyField: true
    })
    name!: string

    @FieldName('性别')
    @TableField({
        orderNumber: 1
    })
    sex!: string
}

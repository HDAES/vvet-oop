import { WetBaseModel } from '@/model/WetBaseModel'
import { ClassName, Description, FieldName } from '@/decorator/CustomName'
import { TableField } from '@/decorator/TableField'

@ClassName('示例类')
export class People extends WetBaseModel {
    /**
    * # 性别
    */
    @FieldName('姓名')
    @Description('这是姓名字段的描述')
    @TableField({
        orderNumber: 1
    })
    name!: string
}

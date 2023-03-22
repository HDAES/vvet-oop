import { Expose } from 'class-transformer'
import { WetAbstractEntity } from '@/dto/WetAbstractEntity'
import { FieldName } from '@/decorator/CustomName'
import { TableField } from '@/decorator/TableField'
import { DateTimeFormatterEnum } from '@/emum/DateTimeFormatterEnum'

/**
 * # 基础接口类
 * @author Hdaes
 */
export class BaseEntity extends WetAbstractEntity {
    @Expose()
    id!: number;

    @Expose()
    createId!: number;

    @Expose()
    @FieldName('创建时间')
    @TableField({
        width:180,
        orderNumber: 100,
        dateTimeFormatter: DateTimeFormatterEnum.YYYY_MM_DD_HH_mm
    })
    createTime!: number;

    @Expose()
    @FieldName('备注')
    remake!: string;

    /**
     * # 修改时间
     */
    @FieldName('修改时间')
    @Expose()
    updatedTime!: string;

    declare updatedBetween: (string | number)[];
}

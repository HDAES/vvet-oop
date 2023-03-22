import { Expose } from 'class-transformer'
import { FieldName } from '../decorator/CustomName'
import { WetBaseModel } from '../model/WetBaseModel'

/**
 * # 数据的实体抽象类
 * @author Hdaes
 */
export abstract class WetAbstractEntity extends WetBaseModel {
    /**
    * # 主键ID
    */
    abstract id: number;

    /**
    * # 创建人Id
    */
    abstract createId: number;

    /**
    * # 创建时间
    */
    abstract createTime: number;

    /**
    * # 描述
    */
    abstract remake: string;

    /**
    * # 创建时间区间
    */
    @FieldName('创建时间')
    @Expose()
    createdBetween!: Array<string | number>;

    /**
     * # 更新时间区间
     */
    @FieldName('更新时间')
    @Expose()
    updateBetween!: Array<string | number>;

    /**
     * # 设置ID
     * @param id
     * @returns
     */
    setId(id: number): this{
      this.id = id
      return this
    }

    /**
     * # 设置备注
     * @param remark
     * @returns
     */
    setRemark(remark: string) : this{
      this.remake = remark
      return this
    }
}

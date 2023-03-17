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
}

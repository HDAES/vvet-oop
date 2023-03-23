/**
 * # 用于全局固定枚举常量的声明
 * @author
 */
export interface IRecord{
    /**
     * # 常量的值
     */
    key: number | string | boolean,

    /**
     * # 常量的显示标题
     */
    label: any

    /**
     * # 是否被禁用
     * 如禁用, 下拉选项中将显示但无法选中
     */
    disabled?: boolean

    /**
     * # 记录集
     */
    children?: IRecord[]
}

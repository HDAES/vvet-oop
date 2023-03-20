import type { IFieldConfig } from '../interface/IFieldConfig'
import type { DateTimeFormatter } from '../emum/DateTimeFormatter'
/**
 * # 表格字段配置接口
 * @author Hdaes
 */
export interface ITableFieldConfig extends IFieldConfig{

    /**
    * # 是否隐藏
    */
    hide?: boolean;

    /**
    * # 是否移除
    */
    removed?:boolean;

    /**
     * 列宽度
     */
    width?: number | string;

    /**
     * 列最小宽度
     */
    minWidth?: number | string;

    /**
     * # 是否表格浮动
     */
    fixed?: 'left' | 'right';

    /**
    * # 排序 越大越靠左边
    */
    orderNumber?: number

    /**
     * # 如是日期 可传入转换规则
     */
    dateTimeFormatter?: DateTimeFormatter | string;

    /**
    * # 是否允许排序
    */
    sortable?: boolean | 'custom';

    /**
    * # 对齐方式
    */
    align?: 'right' | 'left' | 'center';

    /**
     * # 后置文字
     * 一般用于显示一些类似 单位 的文本
     */
    suffixText?: string;

    /**
    * # 是否是可以复制的字段
    */
    isCopyField?: boolean;

    /**
     * # 是否是图片字段
     * 设置为 ```true``` 则该表格列显示为图片, 可配置 ```imageWidth```, ```imageHeight``` 等
     */
    isImage?: boolean;

    /**
     * # 图片的宽度 默认60
     */
    imageWidth?: number;

    /**
     * # 图片的高度 默认60
     */
    imageHeight?: number;
    /**
     * # 空数据兜底字符串
     *
     */
    emptyValue?: string

    /**
    * # 数组分隔符
    */
    arraySeparator?: string
}

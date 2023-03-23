import type { IFieldConfig } from './IFieldConfig'
import type { IconEnum } from '../emum/IconEnum'
import type { IRecord } from './IRecord'

export interface IFormFieldConfig extends IFieldConfig {
    /**
    * # 最大数字
    */
    max?: number;

    /**
    * # 最小数字
    */
    min?: number;

    /**
    * # 最大长度
    */
    maxLength?: number;

    /**
    * # 最小长度
    */
    minLength?: number;

    /**
    * # 占位文本
    */
    placeholder?: string;

    /**
    * # 字段名称
    */
    fieldName?: string;

    /**
    * # 是否文本域
    */
    isTextarea?: boolean

    /**
    * # 是否数字
    */
    isNumber?: boolean

    /**
    * # 是否显示清楚按钮
    */
    showClear?: boolean

    /**
    * # 是否禁用
    */
    disabled?: boolean

    /**
    * # 是否密码框
    */
    isPassword?: boolean

    /**
    * # 前置图标
    */
    prefixIcon?: IconEnum

    /**
    * # 后缀图标
    */
    suffixIcon?:IconEnum

    /**
    * # 是否多选
    */
    multiple?: boolean

    /**
    * # 是否收起多选标签
    */
    collapseTags?: boolean

    /**
    * # 是否可以筛选
    */
    filterable?: boolean

    /**
    * # 限制多选个数
    */
    multipleLimit?: number

    /**
    * # 是否为密码框
    */
    showPassword?: boolean

    /**
     * # 父子关联
     */
    checkStrictly?: boolean;

    /**
    * # 显示输入限制位数
    */
    showLimit?: boolean;

    /**
    * # 枚举值
    */
    enumRecord?: IRecord[]

    /**
     * # 😄返回全路径的值
     */
    emitPath?: boolean;

    /**
     * # 😄显示全路径
     */
    showAllLevels?: boolean;

    /**
     * # 😄是否自适应
     */
    autoSize?: boolean;

    /**
     * # 😄最小行数
     */
    minRows?: number;

    /**
     * # 😄最大行数
     */
    maxRows?: number;

    /**
     * # 😄是否使用Switch控件
     */
    isSwitch?: boolean;

    /**
     * # 😄使用Switch控件时是否隐藏Label文字
     */
    hideSwitchLabel?: boolean;

    /**
     * # 😄是否使用Radio控件
     */
    isRadio?: boolean;

    /**
     * # 😄使用Radio控件时用按钮的样式
     */
    isRadioButton?: boolean;

    /**
     * # 😄表单的默认值
     */
    defaultValue?: boolean | string | number;

    /**
     * # 😄switch不使用枚举配置的颜色
     */
    disableSwitchColor?: boolean;
}

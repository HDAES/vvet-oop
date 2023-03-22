/**
 * # 字段默认配置
 * @author Hdaes
 */
export interface IFieldConfig{
    /**
    * # 字段的名字
     * 此字段无需传入, 将自动从被标记类的属性上读取
    */
    key?: string;

    /**
     * # 字段标题
     * 如传入 则将覆盖 ```@ClassName``` ```@FieldName``` 的声明
     */
    label?: string;
}

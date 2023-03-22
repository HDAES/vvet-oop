/**
 * # 页面的通用配置接口
 * # 优先级最高
 * @author Hdaes
 */
export interface IPageConfig{
    /**
    * # 是否全局隐藏关键词搜索
    */
    hideKeywordSearch?: boolean;

    /**
    * # 关键词搜索框文案
    */
    keywordSearchPlaceholder?: string;

    /**
     * # 表格的没有数据时的提示文本
     */
    tableEmptyText?: string;
    /**
    * # 添加按钮权限标识
    */
    addPermission?: string;

    /**
     * # 表格添加按钮权限标识
     */
    addTablePermission?: string;

    /**
     * # 编辑按钮权限标识
     */
    editPermission?: string;

    /**
     * # 详情按钮权限标识
     */
    detailPermission?: string;

    /**
     * # 删除按钮权限标识
     */
    deletePermission?: string;

    /**
     * # 全局隐藏字段列选择器
     */
    hideFieldFilter?:boolean
}

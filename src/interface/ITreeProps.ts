/**
 * # 树配置项
 * @author Hdase
 */
export interface ITreeProps {
    /**
     * # 😄表示子集节点的key 一般为 'children'
     */
    children?: string,

    /**
     * # 😄表示是否含有子集节点的key 一般为 'hasChildren'
     * 如不传入 则自动判断 'children' 的数据是否为有效数组
     */
    hasChildren?: string
}

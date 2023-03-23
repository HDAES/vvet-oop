import { Expose } from 'class-transformer'
import { WetPage } from './WetPage'

/**
 * # 网络响应分页基础数据模型
 * @author Hdaes
 */
export class WetBaseResponsePage extends WetPage {
    /**
     * # 总行数
     */
    @Expose() total = 0;
}

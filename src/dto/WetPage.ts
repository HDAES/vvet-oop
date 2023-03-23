import { Expose } from 'class-transformer'
import { WetBaseModel } from '../model/WetBaseModel'

/**
 * # 分页基础对象
 * @author Hdaes
 */
export class WetPage extends WetBaseModel {
    /**
    * # 分页页数，默认第一页
    */
    @Expose() currentPage = 1;

    /**
     * # 分页条数，默认一页20条
     */
    @Expose() currentPageSize = 20;
}

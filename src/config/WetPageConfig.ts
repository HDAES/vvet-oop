import { Expose } from 'class-transformer'
import type { IPageConfig } from '../interface/IPageConfig'

export class WetPageConfig implements IPageConfig {
    @Expose() hideKeywordSearch? = false;

    @Expose() keywordSearchPlaceholder?: string;

    @Expose() addPermission?: string;

    @Expose() editPermission?: string;

    @Expose() detailPermission?: string;

    @Expose() deletePermission?: string;

    @Expose() hideFieldFilter? = false;

    @Expose() addTablePermission?: string

    @Expose() tableEmptyText?: string
}

<template>
  <div class="wet-table-container" :style="{ height: (autoHeight ? 'auto' : '0px') }">
    <el-table
      :id="tableId"
      ref="tableRef"
      height="100%"
      :data="dataList"
      :row-key="(row: any) => row.id"
      :lazy="lazy"
      :load="load"
      :default-expand-all="defaultExpandAll"
    >
      <el-table-column
        v-if="hideSelect"
        type="selection"
        width="40"
        fixed="left"
        :reserve-selection="true"
      />
      <el-table-column
        v-if="hideIndex"
        type="index"
        :label="indexText"
        fixed="left"
        width="60"
      />

      <template v-for="item in allFieldList" :key="item.key">
        <el-table-column
          v-if="isSelected(item)"
          :label="item.label"
          :prop="item.key"
          :width="FormatHelper.toPixel(item.width) || 'auto'"
          :min-width="FormatHelper.toPixel(item.minWidth) || 'auto'"
          :fixed="item.fixed"
          :sortable="item.sortable"
          :align="item.align"
        >
          <template #default="scope">
            <slot :name="item.name" :data="scope.row" :index="scope.$index">
              <template v-if="item.key">
                <!--格式化日期-->
                <template v-if="item.dateTimeFormatter">
                  <WDataTime
                    :time="scope.row[item.key]"
                    :formatter="item.dateTimeFormatter"
                    :is-friendly="item.isFriendlyDateTime"
                  />
                </template>
                <!-- 格式化图片-->
                <template v-else-if="item.isImage">
                  <el-image
                    style="background-color:#f3f6f9"
                    :style="{ width: FormatHelper.toPixel(item.imageWidth) , height: FormatHelper.toPixel(item.imageHeight) }"
                    lazy
                    :src="FileHelper.getStaticFileUrl(scope.row[item.key])"
                    :preview-src-list="[FileHelper.getStaticFileUrl(scope.row[item.key])]"
                    :z-index="999999"
                    preview-teleported
                    fit="contain"
                  >
                    <template #error>
                      <div class="image-error">
                        暂无图片
                      </div>
                    </template>
                  </el-image>
                </template>
                <template v-else>
                  <template v-if="item.isCopyField">
                    <WCopy :content="scope.row[item.key]">
                      {{
                        scope.row[item.key] || item.emptyValue
                      }}
                    </WCopy>
                  </template>
                  <template v-else>
                    {{ scope.row[item.key] || item.emptyValue }}
                  </template>
                </template>
                <span v-if="item.suffixText" style="color:#aaa">{{ item.suffixText }}</span>
              </template>
            </slot>
          </template>
        </el-table-column>
      </template>

      <el-table-column
        v-if="!hideOperate || isHideFieldFilter"
        fixed="right"
        align="left"
        :width="
          FormatHelper.toPixel(operateWidth) || 'auto'
        "
      >
        <template #header>
          <div class="operate-header">
            <span v-if="!hideOperate" class="operate-header-title">操作</span>
            <template v-if="isHideFieldFilter">
              <el-popover placement="right" trigger="click">
                <template #reference>
                  <el-icon class="vvet">
                    <Filter />
                    <el-select
                      v-model="selectedFieldList"
                      multiple
                      collapse-tags
                      placement="left"
                      popper-class="field-selector"
                    >
                      <el-option disabled value="" label="请选择需要显示的字段" />
                      <el-option
                        v-for="field in allFieldList"
                        :key="field.key"
                        :label="field.label"
                        :value="field.key"
                        :disabled="field.forceShow"
                      />
                    </el-select>
                  </el-icon>
                </template>
              </el-popover>
            </template>
          </div>
        </template>
        <template #default="scope">
          <el-space>
            <!--自定义操作按钮-->
            <slot name="custom" :data="scope.row" :index="scope.$index" />
            <template v-if="!hideOperate">
              <Wbutton
                v-if="addButton"
                icon-button
                :icon="IconEnum.CIRCLEPLUS"
                :disabled="isAddDisabled(scope.row)"
                :tooltip="isAddDisabled(scope.row) ? '禁止添加' : '添加'"
                :permission="addPermission || pageConfig.addTablePermission"
              />
              <Wbutton
                v-if="editButton"
                icon-button
                :icon="IconEnum.COMPASS"
                :disabled="isEditDisabled(scope.row)"
                :tooltip="isEditDisabled(scope.row) ? '禁止编辑' : '编辑'"
                :permission="editPermission || pageConfig.editPermission"
              />
              <Wbutton
                v-if="detailButton"
                icon-button
                :icon="IconEnum.WARNING"
                :disabled="isDetailDisabled(scope.row)"
                :tooltip="isDetailDisabled(scope.row) ? '禁止查看详情' : '查看详情'"
                :permission="detailPermission || pageConfig.detailPermission"
              />
              <Wbutton
                v-if="deleteButton"
                icon-button
                danger
                :icon="IconEnum.CIRCLECLOSE"
                :disabled="isDeleteDisabled(scope.row)"
                :tooltip="isDeleteDisabled(scope.row) ? '禁止删除' : '删除'"
                :permission="deletePermission || pageConfig.deletePermission"
              />
            </template>
            <!-- 自定义操作列后置插槽 -->
            <slot name="endRow" :data="scope.row" :index="scope.$index" />
          </el-space>
        </template>
      </el-table-column>
      <template #empty>
        <img src="../../../assets/img/empty.svg">
        <div>{{ emptyText || pageConfig.tableEmptyText || '暂无数据' }}</div>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { type PropType, ref, computed } from 'vue'
import type { ClassConstructor } from 'class-transformer'
import { WDataTime, WCopy, Wbutton } from '../../index'
import type { tableInstance } from '../../../type/elementTypes'
import type { ITreeProps } from '../../../interface/ITreeProps'
import { WetAbstractEntity } from '../../../dto/WetAbstractEntity'
import { WetTableFieldConfig } from '../../../config/WetTableFieldConfig'
import { FormatHelper } from '../../../helper/FormatHelper'
import { FileHelper } from '../../../helper/FileHelper'
import { IconEnum } from '../../../emum/IconEnum'
import { WetPageConfig } from '../../../config/WetPageConfig'
import { getPageConfig } from '../../../decorator/PageConfig'

const props = defineProps({
  /**
   * # 表格显示的数据数组
   */
  dataList: {
    type: Array as PropType<WetAbstractEntity[]>,
    default: () => [] as PropType<WetAbstractEntity[]>,
  },
  /**
   * # 表格自动高度
   */
  autoHeight: {
    type: Boolean,
    default: false,
  },
  /**
   * # 是否懒加载子节点数据
   */
  lazy: {
    type: Boolean,
    default: false,
  },
  /**
   * # 加载子节点数据的函数
   */
  load: {
    type: Function,
    default: null,
  },

  /**
   * # 是否展开树的所有项目
   */
  defaultExpandAll: {
    type: Boolean,
    default: true,
  },

  /**
   * # 树结构的标准配置
   */
  treeProps: {
    type: Object as PropType<ITreeProps>,
    default: () => ({
    }),
  },

  /**
   * # 隐藏选择框
   */
  hideSelect: {
    type: Boolean,
    default: true,
  },

  /**
   * # 隐藏序号
   */
  hideIndex: {
    type: Boolean,
    default: false,
  },
  /**
   * # 序号名字
   */
  indexText: {
    type: String,
    default: '序号',
  },

  /**
   * # 显示字段列表
   * 如传入 则优先使用
   */
  fieldList: {
    type: Array as PropType<WetTableFieldConfig[]>,
    default: () => [],
  },

  /**
   * # 格绑定的数据实体
   */
  entity: {
    type: Function as unknown as PropType<ClassConstructor<WetAbstractEntity>>,
    default: undefined,
  },

  /**
   * # 隐藏操作栏
   */
  hideOperate: {
    type: Boolean,
    default: false,
  },

  /**
   * # 字段筛选
   */
  fieldFilter: {
    type: Boolean,
    default: true,
  },

  /**
   * # 操作栏宽度
   */
  operateWidth: {
    type: Number || String,
    default: 130,
  },

  /**
   * # 添加字段
   */
  addButton: {
    type: Boolean,
    default: true,
  },

  /**
   * # 控制表格添加按钮是否禁用
   */
  disableAdd: {
    type: Function,
    default: null,
  },
  /**
   * # 行内添加按钮的权限标识
   */
  addPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 编辑按钮字段
   */
  editButton: {
    type: Boolean,
    default: true,
  },

  /**
   * # 控制表格编辑按钮是否禁用
   */
  disableEdit: {
    type: Function,
    default: null,
  },
  /**
   * # 编辑按钮的权限标识
   */
  editPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 详情按钮字段
   */
  detailButton: {
    type: Boolean,
    default: true,
  },

  /**
   * # 控制表格详情按钮是否禁用
   */
  disableDetail: {
    type: Function,
    default: null,
  },
  /**
   * # 详情按钮的权限标识
   */
  detailPermission: {
    type: String,
    default: undefined,
  },

  /**
   * # 删除按钮字段
   */
  deleteButton: {
    type: Boolean,
    default: true,
  },

  /**
   * # 控制表格删除按钮是否禁用
   */
  disableDelete: {
    type: Function,
    default: null,
  },
  /**
   * # 删除按钮的权限标识
   */
  deletePermission: {
    type: String,
    default: undefined,
  },
  /**
   * # 表格为空 文字描述
   */
  emptyText: {
    type: String,
    default: '',
  },

})

/**
* # 表格dom
*/
const tableRef = ref<tableInstance>()

/**
 * Table的ID
 */
const tableId = `tb_${Math.floor(Math.random() * 1000)}`

/**
 * 内部使用的entity
 */
const tableBindEntity: ClassConstructor<WetAbstractEntity> | null = props.entity || null

/**
 * 页面配置
 */

let pageConfig: WetPageConfig = new WetPageConfig()

/**
 * 选择的字段
 */
const selectedFieldList = ref([] as string[])
/**
 * # 获取所有表格所有字段
 */
const allFieldList = computed(() => {
  if (props.fieldList?.length > 0) {
    return props.fieldList?.filter(item => !item.removed)
  }
  if (tableBindEntity) {
    return (tableBindEntity.prototype as WetAbstractEntity).getTableFieldConfigList().filter(item => !item.removed)
  }
  return []
})

/**
 * 更新已选字段
 */
function updateSelectedFieldList() {
  selectedFieldList.value = []
  selectedFieldList.value = (allFieldList.value || []).filter(item => !item.removed && !item.hide).map(item => item.key || '')
}

/**
 * 是否隐藏表格列
 */
const isHideFieldFilter = computed(() => {
  if (pageConfig.hideFieldFilter) {
    return false
  }
  return props.fieldList
})

/**
 * 字段是否选择
 */
function isSelected(item: WetTableFieldConfig) {
  if (!item.key) {
    return false
  }
  return selectedFieldList.value.indexOf(item.key) >= 0
}

const isAddDisabled = (row: typeof tableBindEntity) => (props.disableAdd ? props.disableAdd(row) : false)
const isDeleteDisabled = (row: typeof tableBindEntity) => (props.disableDelete ? props.disableDelete(row) : false)
const isDetailDisabled = (row: typeof tableBindEntity) => (props.disableDetail ? props.disableDetail(row) : false)
const isEditDisabled = (row: typeof tableBindEntity) => (props.disableEdit ? props.disableEdit(row) : false)
// 初始化
function init() {
  // 初始化页面配置
  if (tableBindEntity) {
    pageConfig = getPageConfig(tableBindEntity)
  }
  // 初始更新
  updateSelectedFieldList()
}

init()
</script>
<style lang="scss" >
.wet-table-container{
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 300px;
  .operate-header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &-title{
      flex: 1;
      text-align: left;
    }
    .vvet{
      position: relative;
      font-size: 16px;
      transition: all 0.3s;
      cursor: pointer;
      svg{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
      .el-select {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        opacity: 0;

      }
    }

  }
  .field-selector {
    span {
      padding-right: 60px;
    }

    .el-select-dropdown__item.selected::after {
      width: 16px !important;
      height: 16px !important;
    }
  }
}

</style>

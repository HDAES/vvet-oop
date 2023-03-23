<template>
  <div class="vvet-panel">
    <div v-if="showHeader" class="panel-header">
      <el-page-header :icon="ArrowLeft" title="   ">
        <template #content>
          <span> Title </span>
        </template>
        <template #extra>
          <el-space>
            <Wbutton icon-button :icon="IconEnum.PRINTER" tooltip="打印" />
            <Wbutton icon-button :icon="IconEnum.MONITOR" tooltip="全屏" />
          </el-space>
        </template>
      </el-page-header>
    </div>
    <el-scrollbar class="panel-body">
      <slot name="body" />
      <slot />
    </el-scrollbar>
    <div v-if="showFooter" class="panel-footer">
      <div class="panel-footer-left">
        <slot name="footerLeft" />
      </div>
      <div class="panel-footer-right">
        <slot name="footerRight" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ArrowLeft } from '@element-plus/icons-vue'
import { Wbutton } from '../../index'
import { IconEnum } from '@/emum/IconEnum'

defineProps({
  /**
   * # 展示头部
   */
  showHeader: {
    type: Boolean,
    default: true,
  },
  /**
   * # 展示脚步
   */
  showFooter: {
    type: Boolean,
    default: false,
  },
})
</script>
<style lang="scss" scoped>
.vvet-panel{
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  .panel-header{
    padding: 10px 20px;
    border-bottom: solid 1px var(--el-menu-border-color);
    :deep(.el-page-header__extra){
      display: flex;
      align-items: center;
    }
  }
  .panel-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
    height: 0;
    padding: 10px 15px;
    position: relative;
    :deep(.el-scrollbar__view){
      display: flex;
      flex-direction: column;
    }
  }
  .panel-footer{
    display: flex;
    flex-direction: row;
    padding: 0px 15px 10px 15px;
    .panel-footer-left{
      flex: 1;
    }
  }
}
</style>

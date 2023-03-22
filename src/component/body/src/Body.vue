<template>
  <div class="vvet-body">
    <el-container class="vvet-container">
      <el-aside class="vvet-aside" :width="collapseRef?'0':'200px'">
        <div class="vvet-aside-logo">admin</div>
        <div class="vvet-aside-menu">
          <WMenu :collapse="collapseRef" :menu-list="menuList" />
        </div>
        <div class="vvet-aside-copyright">@</div>
      </el-aside>
      <el-container style="">
        <el-header class="vvet-header">
          <div class="vvet-header-left">
            <el-icon class="collapse" :size="24" @click="collapseChanged">
              <component :is="collapseRef?IconEnum.EXPAND :IconEnum.FOLD" />
            </el-icon>
            <div>
              <slot name="navigator">
                <el-breadcrumb separator-icon="ArrowRight">
                  <el-breadcrumb-item v-for="bread in breadList" :key="bread.id">
                    {{ bread.name }}
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </slot>
            </div>
          </div>

          <div>123</div>
        </el-header>
        <el-scrollbar class="vvet-main">
          <slot name="main" />
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import { type PropType, ref, computed } from 'vue'
import { WMenu } from '../../index'
import { WetMenu } from '../../../model/WetMenu'
import { IconEnum } from '../../../emum/IconEnum'
import { AppConfig } from '../../../AppConfig'

const props = defineProps({
  /**
   * # 初始化是否收起
   */
  collapse: {
    type: Boolean,
    default: false,
  },
  /**
   * # 菜单列表
   */
  menuList: {
    type: Array as PropType<WetMenu[]>,
    default: () => [],
  },
})
/**
 * 是否收起
 */
const collapseRef = ref(false)
function collapseChanged() {
  collapseRef.value = !collapseRef.value
}
const init = async () => {
  collapseRef.value = props.collapse
}
init()

/**
 * 判断路由是否在菜单链中
 * @param menu 菜单
 */
const isChildMenu = (menu: WetMenu): boolean => {
  if (AppConfig.router && menu.path === AppConfig.router.currentRoute.value.path) {
    return true
  }
  if (!menu.children || menu.children.length === 0) {
    return false
  }
  for (const sub of menu.children) {
    if (isChildMenu(sub)) {
      return true
    }
  }
  return false
}

/**
 * 获取菜单链
 * @param menuList
 */
const getMenuTraceList = (menuList: WetMenu[]) => {
  let list: WetMenu[] = []
  for (const menu of menuList) {
    if (isChildMenu(menu)) {
      list.push(menu)
    }
    if (menu.children && menu.children.length > 0) {
      list = list.concat(getMenuTraceList(menu.children))
    }
  }
  return list
}

/**
 * 面包屑菜单链
 */
const breadList = computed(() => getMenuTraceList(props.menuList))
</script>
<style lang="scss" scoped>
.vvet-body{
  position: fixed;
  top:0;
  right: 0;
  bottom: 0;
  left: 0;
  .vvet-container{
    height: 100%;
  }
  .vvet-aside{
    display: flex;
    flex-direction: column;
    transition: width 0.5s;
    min-width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2);;
    border-right: solid 1px var(--el-menu-border-color);
    &-logo{
      height: 60px;
    }
    &-menu{
      flex: 1;
      .el-menu{
        border-right: none;
      }
      .sidebar-el-menu:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
      }

      .el-menu--collapse .el-submenu__title span {
        display: none;
      }

      /* 隐藏 */
      .el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
        display: none;
      }
    }
  }
  .vvet-aside::-webkit-scrollbar {
    display: none;
  }

  .vvet-header{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 1px var(--el-menu-border-color);
    &-left{
      display: flex;
      flex-direction: row;
      align-items: center;
      .collapse{
        cursor: pointer;
        margin-right: 10px;
      }
    }
  }

  .vvet-main{
    margin: 10px;
    border-radius: 6px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    border: solid 1px var(--el-menu-border-color);
    :deep(.el-scrollbar__view){
      height: 100%;
    }

  }
}
</style>

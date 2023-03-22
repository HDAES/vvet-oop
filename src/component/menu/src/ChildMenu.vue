<template>
  <template v-for="menu in menuList " :key="menu.id">
    <template v-if="!menu.isHide">
      <el-sub-menu v-show="menu.children && menu.children.length > 0" :id="menu.id" :index="menu.id">
        <template #title>
          <el-icon><component :is="menu.icon" /></el-icon>
          <span>{{ menu.name }}</span>
        </template>
        <ChildMenu :menu-list="menu.children" />
      </el-sub-menu>
      <el-menu-item v-show="!menu.children || menu.children.length === 0" :id="menu.id" :index="menu.path">
        <el-icon><component :is="menu.icon" /></el-icon>
        <slot name="title">
          <span> {{ menu.name }}</span>
        </slot>
      </el-menu-item>
    </template>
  </template>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue'
import { WetMenu } from '../../../model/WetMenu'

defineProps({
  menuList: {
    type: Array as PropType<WetMenu[]>,
    default: () => [],
  },
})

</script>

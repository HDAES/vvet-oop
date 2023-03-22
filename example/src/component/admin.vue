<template>
  <WBody :menu-list="menuList">
    <template #main>
      <router-view />
    </template>
  </WBody>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { WBody } from '@/component'
import { WetMenu } from '@/model/WetMenu'
import { IconEnum } from '@/emum/IconEnum'
import { RouterHelper } from '../helper/RouterHelper'

const menuList = ref([] as WetMenu[])

async function getMenuList() {
  menuList.value.push(new WetMenu().setName('示例')
  .setPath('/example')
  .setComponent('/index/index')
  .setIcon(IconEnum.CIRCLECLOSE))

  menuList.value.push(new WetMenu().setName('表格')
  .setPath('/table')
  .setComponent('/table/index')
  .setIcon(IconEnum.CIRCLECLOSE))

  menuList.value.push(new WetMenu().setName('列表')
  .setPath('/list')
  .setComponent('/list/index')
  .setIcon(IconEnum.CIRCLECLOSE))
  new RouterHelper().initVueRouter(menuList.value, 'admin')
}

async function init() {
  await getMenuList()
}
init()
</script>

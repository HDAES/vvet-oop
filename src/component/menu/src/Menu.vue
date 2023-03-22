<template>
  <el-menu
    class="wet-menu"
    :collapse="collapse"
    :default-active="defaultMenu"
    router
  >
    <ChildMenu :menu-list="menuList" />
  </el-menu>
</template>

<script lang="ts" setup>
import { type PropType, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { WetMenu } from '../../../model/WetMenu'
import ChildMenu from './ChildMenu.vue'

defineProps({
  collapse: {
    type: Boolean,
    default: false,
  },

  menuList: {
    type: Array as PropType<WetMenu[]>,
    default: () => [],
  },
})

/**
 * 菜单状态激活
 */
const defaultMenu = ref(window.location.pathname)
const route = useRoute()
watch(() => route, (newValue, oldValue) => {
  defaultMenu.value = newValue.path || window.location.pathname
}, {
  deep: true,
  immediate: true,
})
</script>

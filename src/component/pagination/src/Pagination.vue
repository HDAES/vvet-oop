<template>
  <el-pagination
    :page-sizes="pageSizes"
    :pager-count="pagerCount"
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="100"
  />
</template>

<script lang="ts" setup>
import { type PropType } from 'vue'
import { AppConfig } from '../../../AppConfig'
import { WetBaseResponsePage } from '../../../dto/WetBaseResponsePage'

defineProps({
  pageData: {
    type: Object as PropType<WetBaseResponsePage>,
    default: new WetBaseResponsePage(),
  },
  pagerCount: {
    type: Number,
    default: () => AppConfig.pagerCount,
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => AppConfig.pageSize,
  },

})
</script>

<template>
  <WPanel show-footer>
    <template #body>
      <WTable :data-list="dataList" :entity="People" />
    </template>
    <template #footerRight>
      <WPagination />
    </template>
  </WPanel>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { People } from '@@/entity/People'
import { WPanel, WPagination, WTable } from '@/component'

const dataList = ref([])

</script>

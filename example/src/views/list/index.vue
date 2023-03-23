<template>
  <WPanel show-footer>
    <template #body>
      <WTable :data-list="dataList" :entity="People" />
    </template>
    <template #footerRight>
      <WPaination />
    </template>
  </WPanel>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { People } from '@@/entity/People'
import { WPanel, WPaination, WTable } from '@/component'

const dataList = ref([])

onMounted(() => {
  const arr = []
  for (let i = 0; i < 50; i++) {
    arr.push({
      name: i,
      sex: 1,
    })
  }
  console.log(arr)
  dataList.value = arr
})
</script>

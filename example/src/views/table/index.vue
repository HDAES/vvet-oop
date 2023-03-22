<template>
  <WPanel>
    <template #body>
      <WTable :data-list="dataList" :entity="People" />
    </template>
  </WPanel>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { People } from '../../entity/People'
import { WPanel, WTable } from '@/component'

const dataList = ref<People[]>([

])
</script>

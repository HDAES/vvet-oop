<template>
  <WPanel>
    <template #body>
      <h1 v-for="item in 100" :key="item">{{ item }}</h1>
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

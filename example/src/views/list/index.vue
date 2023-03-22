<template>
  <WPanel>
    <template #body>
      <WTable :data-list="dataList" :entity="People" />
    </template>
    <template #footerRight>
      <WPaination />
    </template>
  </WPanel>
</template>

<script lang="ts" setup>
import { People } from '@@/entity/People'
import { WPanel, WPaination, WTable } from '@/component'

const dataList = []
</script>

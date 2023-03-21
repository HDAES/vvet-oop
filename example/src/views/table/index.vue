<template>
  <h1>
    <Table :data-list="dataList" :entity="People" />
  </h1>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Table from '@/component/table/src/Table.vue'
import { People } from '../../../entity/People'

const dataList = ref<People[]>([
  {
    id: 1,
    name: 'hello',
    sex: '男',
    createId: 1,
    createTime: 123,
    remake: '123',
    updatedTime: '123',
  },
])
</script>

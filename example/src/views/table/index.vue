<template>
  <Table :data-list="dataList" :entity="People" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Table from '@/component/table/src/Table.vue'
import { People } from '../../../entity/People'

const dataList = ref<People[]>([

])
</script>

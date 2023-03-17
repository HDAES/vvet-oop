<template>
  <el-button :loading="loading" type="primary" @click="handleRequest">请求</el-button>
  <el-button type="primary" @click="handleDialog">弹窗</el-button>
</template>

<script setup>
import { ref } from 'vue'
import DemoService from '../../../service/DemoService'
import Dialog from './dialog.vue'
import { DialogHelper } from '@/helper/DialogHelper'
import { People } from '../../../entity/People'

const loading = ref(false)
const handleRequest = () => {
  new DemoService(loading).getDemoData()
}

const handleDialog = () => {
  DialogHelper.show(Dialog, 1123).then(res => {
    console.log(res)
  })
}
</script>

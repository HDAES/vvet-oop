<template>
  <el-button :loading="loading" type="primary" @click="handleRequest">请求</el-button>
</template>

<script setup>
import { ref } from 'vue'
import DemoService from '../../../service/DemoService'

const loading = ref(false)
const handleRequest = () => {
  new DemoService(loading).getDemoData()
}
</script>

<template>
  <WDialog
    width="1000"
    @on-cancel="props.onCancel()"
  >
    <el-popover
      placement="top-start"
      title="Title"
      :width="200"
      trigger="hover"
      content="this is content, this is content, this is content"
    >
      <template #reference>
        <el-button class="m-2">Hover to activate</el-button>
      </template>
    </el-popover>
  </WDialog>
</template>
<script setup>
import { WDialog } from '@/component'
import { dialogPropsId } from '@/helper/DialogHelper'

const props = defineProps(dialogPropsId())
</script>

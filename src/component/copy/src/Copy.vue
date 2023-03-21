<template>
  <div class="copy">
    <!-- 自定义显示的插槽 -->
    <div class="content">{{ content }}</div>
    <el-tooltip content="点击复制" placement="top">
      <el-link :underline="false" @click="copy">
        <el-icon><CopyDocument /></el-icon>
      </el-link>
    </el-tooltip>
  </div>
</template>
<script lang="ts" setup>
import userClipboard from 'vue-clipboard3'
import { WetNotification } from '../../../tips/WetNotification'

const props = defineProps({
  /**
   * # 复制的内容
   */
  content: {
    type: String,
    default: '-',
  },
})

const { toClipboard } = userClipboard()

async function copy() {
  await toClipboard(props.content)
  new WetNotification().setTitle('复制成功')
  .setMessage('选择的内容已经复制到剪切板!')
  .success()
}
</script>
<style lang="scss">
.copy{
  display: flex;
  flex-direction: row;
  width: 100%;
  .content{
    padding-right: 10px;
  }
}
</style>

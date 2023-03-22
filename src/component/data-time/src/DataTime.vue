<template>
  <el-tooltip :content="toolTips" placement="top">
    <el-link class="friend-datetime" :underline="false">
      {{ getDateTimeString }}
    </el-link>
  </el-tooltip>
</template>
<script lang="ts" setup>
import { type PropType, computed } from 'vue'
import { DateTimeFormatterEnum } from '../../../emum/DateTimeFormatterEnum'
import { AppConfig } from '../../../AppConfig'
import { DateTimeHelper } from '../../../helper/DataTimeHelper'

const props = defineProps({
  /**
   * # 毫秒时间戳
   */
  time: {
    type: Number,
    default: undefined,
  },

  /**
   * # 时间格式
   * 推荐使用 ```AirDateTimeFormatter```
   */
  formatter: {
    type: String as PropType<DateTimeFormatterEnum | string>,
    default: AppConfig.defaultDateTimeFormatter,
  },

  /**
   * # 是否显示友好时间
   */
  isFriendly: {
    type: Boolean,
    default: false,
  },
})

/**
 * # 读取友好时间
 */
const getDateTimeString = computed(() => {
  if (props.time === undefined || props.time === null) {
    return '-'
  }
  if (props.isFriendly) {
    return DateTimeHelper.getFriendlyDateTime(props.time)
  }
  return DateTimeHelper.formatFromMilliSecond(props.time, props.formatter)
})

/**
 * # 提示信息取反
 */
const toolTips = computed(() => {
  if (props.time === undefined || props.time === null) {
    return '-'
  }
  if (!props.isFriendly) {
    return DateTimeHelper.getFriendlyDateTime(props.time)
  }
  return DateTimeHelper.formatFromMilliSecond(props.time, props.formatter)
})
</script>

<style  lang="scss">
.friend-datetime,
.friend-datetime * {
  user-select: none !important;

  .is-disabled {
    color: #333;
  }
}
</style>

<template>
  <transition name="dialog">
    <div
      class="dialog"
      :class="getDialogClass"
      @mouseup="dialogMouseUpEvent()"
      @mousemove="dialogMouseMoveEvent($event)"
      @click.self="dialogBgClicked()"
    >
      <div
        :id="randId"
        class="dialog-content"
        :style="{
          width: FormatHelper.toPixel(width),
          height: FormatHelper.toPixel(height),
          minWidth: FormatHelper.toPixel(minWidth),
          minHeight: FormatHelper.toPixel(minHeight),
          transform: 'translate(' + x + 'px, ' + y + 'px)',
          borderRadius: isFullScreen ? '0px' : '4px',
        }"
        :class="isFullScreen && fullable ? 'fullscreen' : ''"
      >
        <div
          class="dialog-content-header"
          :style="{
            cursor: cursorRef,
          }"
          @mousedown="dialogMouseDownEvent($event)"
          @dblclick="headerDoubleClicked()"
        >
          <div class="dialog-content-header-title">{{ title }}</div>
          <el-tooltip
            v-if="fullable"
            effect="dark"
            content="全屏"
            placement="top"
          >
            <el-icon><FullScreen @click="headerDoubleClicked" /></el-icon>
          </el-tooltip>
          <el-tooltip
            v-if="!hideClose"
            effect="dark"
            content="关闭"
            placement="top"
          >
            <el-icon class="close" @click="emits('onCancel')"><SwitchButton /></el-icon>
          </el-tooltip>
        </div>
        <div v-loading="loading" class="dialog-content-body">
          <slot name="body" />
          <slot />
        </div>
        <div class="dialog-content-footer">
          <div class="status">
            <slot name="status" />
          </div>
          <div v-if="!hideCtrl" class="control">
            <el-button
              v-if="!hideConfirm"
              class="confirm"
              type="primary"
              :disabled="disableConfirm || loading"
              @click="confirmEvent()"
            >
              {{ confirmText }}
            </el-button>
            <el-button v-if="!hideCancel" class="cancel" @click="emits('onCancel')">
              {{ cancelText }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts" setup>
import { ref, nextTick, computed } from 'vue'
import { FormatHelper } from '@/helper/formatHelper'
import { WetNotification } from '../tips/WetNotification'

const props = defineProps({
  /**
   * # 标题
   */
  title: {
    type: String,
    default: '标题',
  },
  /**
   * # 宽度
   */
  width: {
    type: String || Number,
    default: '',
  },

  /**
   * # 高度
   */
  height: {
    type: String || Number,
    default: '',
  },

  /**
   * # 最小宽度
   */
  minWidth: {
    type: String || Number,
    default: '',
  },

  /**
   * # 最小高度
   */
  minHeight: {
    type: String || Number,
    default: '',
  },

  /**
   * # 是否可以移动
   */
  movable: {
    type: Boolean,
    default: true,
  },
  /**
   * # 是否可以全屏
   */
  fullable: {
    type: Boolean,
    default: true,
  },

  /**
   * # 是否正在Loading
   */
  loading: {
    type: Boolean,
    default: false,
  },

  /**
   * # 隐藏关闭按钮
   */
  hideClose: {
    type: Boolean,
    default: false,
  },
  /**
   * # 隐藏底部控制栏
   */
  hideCtrl: {
    type: Boolean,
    default: false,
  },
  /**
   * # 隐藏确定按钮
   */
  hideConfirm: {
    type: Boolean,
    default: false,
  },
  /**
   * # 禁用确定按钮
   */
  disableConfirm: {
    type: Boolean,
    default: false,
  },

  /**
   * # 确定按钮文字描述
   */
  confirmText: {
    type: String,
    default: '确定',
  },

  /**
   * # 隐藏取消按钮
   */
  hideCancel: {
    type: Boolean,
    default: false,
  },
  /**
   * # 取消按钮文字
   */
  cancelText: {
    type: String,
    default: '取消',
  },
  /**
   * # 如传入此参数,则自动校验,否则请自行校验
   */
  formRef: {
    type: Object,
    default: undefined,
  },
})

/**
 * # 随机ID
 */
const randId = ref(
    `id${Number.parseInt((Math.random() * 999999999).toString())}`,
)

/**
 * 回调事件
 */
const emits = defineEmits<{(event: 'onConfirm'): void;
  (event: 'onCancel'): void;
  (event: 'onFull', data: boolean): void;
}>()
/**
 * 窗体偏移的x
 */
const x = ref(0)

/**
 * 窗体偏移的y
 */
const y = ref(0)

/**
 * 是否全屏
 */
const isFullScreen = ref(false)

/**
 * # 标题的鼠标样式
 */
const cursorRef = ref('grab')

/**
 * 开始移动的鼠标x
 */
let startX = 0

/**
 * 开始移动的鼠标Y
 */
let startY = 0

/**
 * 窗口的真实宽度
 */
let trueWidth = 0

/**
 * 窗口的真实高度
 */
let trueHeight = 0

/**
 * 是否正在移动
 */
const isMoving = ref(false)
/**
 * # 鼠标按下事件
 * @param
 * @returns
 */
const dialogMouseDownEvent = (event: MouseEvent) => {
  if (isFullScreen.value || !props.movable) return

  cursorRef.value = 'grabbing'
  startX = event.clientX - x.value
  startY = event.clientY - y.value
  isMoving.value = true
  trueWidth = window.innerWidth
      - (document.querySelector(`#${randId.value}`) as HTMLDivElement).offsetWidth
  trueHeight = window.innerHeight
      - (document.querySelector(`#${randId.value}`) as HTMLDivElement).offsetHeight
}

/**
 * 鼠标放开事件
 */
function dialogMouseUpEvent() {
  if (isMoving.value) {
    cursorRef.value = 'grab'
    isMoving.value = false
  }
}

/**
 * 鼠标移动事件
 * @param event event
 */
const dialogMouseMoveEvent = (event: MouseEvent) => {
  if (isMoving.value) {
    nextTick(() => {
      x.value = event.clientX - startX
      y.value = event.clientY - startY
      if (x.value < (0 - trueWidth) / 2 + 10) {
        x.value = (0 - trueWidth) / 2
      }
      if (x.value > trueWidth / 2 - 10) {
        x.value = trueWidth / 2
      }
      if (y.value < (0 - trueHeight) / 2 + 10) {
        y.value = (0 - trueHeight) / 2
      }
      if (y.value > trueHeight / 2 - 10) {
        y.value = trueHeight / 2
      }
    })
  }
}

/**
 * # 鼠标双击全屏事件
 */
const headerDoubleClicked = () => {
  if (!props.fullable) return
  isFullScreen.value = !isFullScreen.value
  x.value = 0
  y.value = 0
  cursorRef.value = isFullScreen.value ? 'pointer' : 'grab'
}

/**
 * 当前抖动状态
 */
const isShaking = ref(false)

/**
 * 获取样式
 */
const getDialogClass = computed(() => {
  const arr: string[] = []
  if (isShaking.value) {
    arr.push('shake')
  }
  return arr.join(' ')
})
/**
 * 点击背景后的抖动
 */
function dialogBgClicked() {
  console.log(123)
  if (isShaking.value) {
    return
  }
  isShaking.value = true
  setTimeout(() => {
    isShaking.value = false
  }, 400)
}

// 弹窗确认
const confirmEvent = async () => {
  if (props.formRef) {
    try {
      if (!await props.formRef.validate()) {
        dialogBgClicked()
        return
      }
    } catch (e) {
      const keys = Object.keys(e as any)
      if (keys.length > 0) {
        /* const list = ((e as any)[keys[0]] as AirValidator[])
           if (list.length > 0) {
             new WetNotification().setTitle('验证失败')
             .setMessage(list[0].message)
             .warning()
           } */
      }
      dialogBgClicked()
      return
    }
  }
  emits('onConfirm')
}

</script>

<style lang="scss" scoped>
.dialog{
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(#000000,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  &-content{
    background-color: #ffffff;
    box-shadow: 0px 0px 20px rgba($color: #000000, $alpha: 0.3);
    max-width: 80%;
    max-height: 80%;
    display: flex;
    flex-direction: column;
    transition: min-width 0.2s, min-height 0.2s;
    user-select: none;
    overflow: hidden;
    animation: dialog-in 0.5s;
    &-header{
      padding: 15px 20px 30px 20px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      &-title{
        font-weight: normal;
        flex: 1;
      }
      .close{
        margin-left: 20px;
      }
    }
    &-body {
      flex: 1;
      height: 0;
      overflow: hidden;
      overflow-y: auto;
      padding: 10px 20px;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    &-footer {
      padding: 20px 20px;
      display: flex;
      flex-direction: row;
      font-size: 16px;
      align-items: center;
      .status {
        flex: 1;
      }

      .control {
        display: flex;
        flex-direction: row;
      }
    }
  }
  .fullscreen{
    min-width: 100% !important;
    min-height: 100% !important;
  }
}

.shake {
  animation: shake-in 0.2s infinite;
}
</style>

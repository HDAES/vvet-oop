<template>
  <Dialog
    width="1000"
    @on-cancel="props.onCancel()"
  >
    <h1>1</h1>
  </Dialog>
</template>
<script setup>
import Dialog from '@/component/Dialog.vue'
import { dialogPropsId } from '@/helper/DialogHelper'

const props = defineProps(dialogPropsId())
console.log(props)

</script>

<template>
  <Dialog
    width="1000"
    @on-cancel="props.onCancel()"
  >
    <h1>1</h1>
  </Dialog>
</template>
<script setup>
import { plainToClass } from 'class-transformer'
import Dialog from '@/component/Dialog.vue'
import { dialogPropsId } from '@/helper/DialogHelper'
import { People } from '../../../entity/People'

const props = defineProps(dialogPropsId())
const xiaoming = { name: '小明' }

console.log(People.prototype.getCustomClassName())
console.log(People.prototype.getCustomFieldName('name'))
console.log(People.prototype.getCustomDescription('name'))
console.log(plainToClass(People, xiaoming))
console.log(People.prototype.getCustomTableFieldConfig('name'))
</script>

<template>
  <div class="vvet-panel">
    <div class="panel-body">
      <slot name="body" />
      <slot />
    </div>
    <div class="panel-footer">
      <div class="panel-footer-right">
        <slot name="footerRight" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.vvet-panel{
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  .panel-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
    height: 0;
    padding: 20px;
    position: relative;
  }
  .panel-footer{
    padding: 0px 20px 20px 20px;
  }
}
</style>

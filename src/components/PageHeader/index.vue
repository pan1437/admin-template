  
<template>
  <div class="wrapper">
    <div class="page-header">
      <div class="page-header__content">
        <slot name="content">{{ content }}</slot>
      </div>
      <div class="page-header__right" @click="$emit('back')">
        <i class="el-icon-back"></i>
        <div class="page-header__title">
          <slot name="title">{{ title }}</slot>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
import { t } from 'element-ui/src/locale'
export default {
  name: 'ElPageHeader',
  props: {
    title: {
      type: String,
      default() {
        return t('el.pageHeader.title')
      }
    },
    content: String
  }
}
</script>

<style lang='scss' scoped>
@import '~@/styles/color.scss';

.wrapper {
  .page-header {
    display: flex;
    height: 50px;
    align-items: center;
    line-height: 24px;
    justify-content: space-between;
    color: $primary;
    &__content {
      margin-left: 40px;
    }
    &__right {
      margin-right: 40px;
      display: flex;
      cursor: pointer;
      align-items: center;
      font-size: 18px;
    }
  }
  .el-divider--horizontal {
    margin: 0;
  }
}
</style>
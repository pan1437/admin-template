<template>
  <el-form
    ref="form"
    class="page-form margin10"
    :class="className"
    :model="data"
    :rules="rules"
    :inline="inline"
    :style="{ width: width }"
    :label-width="labelWidth"
  >
    <el-form-item
      v-for="(item, index) in getConfigList()"
      :key="index"
      :prop="item.value"
      :label="item.type === 'button' ? '' : item.label"
      :class="item.className"
    >
      <!-- solt -->
      <template v-if="item.type === 'slot'">
        <slot :name="'form-' + item.value" />
      </template>
      <!-- 普通输入框 -->
      <el-input
        v-if="item.type === 'input' || item.type === 'password'"
        v-model="data[item.value]"
        :type="item.type"
        :disabled="item.disabled"
        :placeholder="getPlaceholder(item)"
        @focus="handleEvent(item.event)"
      />
      <!-- 文本输入框 -->
      <el-input
        v-if="item.type === 'textarea'"
        v-model.trim="data[item.value]"
        :type="item.type"
        :disabled="item.disabled"
        :placeholder="getPlaceholder(item)"
        :autosize="item.autosize || { minRows: 2, maxRows: 10 }"
        @focus="handleEvent(item.event)"
      />
      <!-- 计数器 -->
      <el-input-number
        v-if="item.type === 'inputNumber'"
        v-model="data[item.value]"
        size="small"
        :min="item.min"
        :max="item.max"
        @change="handleEvent(item.event)"
      />
      <!-- 选择框 -->
      <el-select
        v-if="item.type === 'select'"
        v-model="data[item.value]"
        :disabled="item.disabled"
        :clearable="item.clearable"
        :filterable="item.filterable"
        :placeholder="getPlaceholder(item)"
        @change="handleEvent(item.event, data[item.value])"
      >
        <el-option
          v-for="(childItem, childIndex) in listTypeInfo[item.list]"
          :key="childIndex"
          :label="childItem[selectFormat.key]"
          :value="childItem[selectFormat.value]"
        />
      </el-select>
      <!-- 日期选择框 -->
      <el-date-picker
        v-if="item.type === 'date'"
        v-model="data[item.value]"
        :type="item.dateType"
        :picker-options="item.TimePickerOptions"
        :clearable="item.clearable"
        :disabled="item.disabled"
        :placeholder="getPlaceholder(item)"
        @focus="handleEvent(item.event)"
      />
      <!-- 信息展示框 -->
      <el-tag v-if="item.type === 'tag'">
        {{
          $fn.getDataName({
            dataList: listTypeInfo[item.list],
            value: 'value',
            label: 'key',
            data: data[item.value]
          }) || '-'
        }}
      </el-tag>
      <!-- 按钮 -->
      <el-button
        v-else-if="item.type === 'button'"
        v-waves
        :class="`autosize: { minRows: 4 }-${item.type}`"
        :type="item.btType"
        :icon="item.icon"
        :loading="item.btnLoading || false"
        @click="handleClick(item.event)"
      >
        {{ item.label }}
      </el-button>
      <span v-if="item.type === 'span'">{{ data[item.value] }}</span>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'PageForm',
  props: {
    // 自定义类名
    className: {
      type: String
    },
    // 表单数据
    data: {
      type: Object
    },
    inline: {
      type: Boolean,
      default: false
    },
    // 相关字段
    fieldList: {
      type: Array
    },
    selectFormat: {
      type: Object,
      default: () => {
        return {
          key: 'key',
          value: 'value'
        }
      }
    },
    // 验证规则
    rules: {
      type: Object
    },
    // 相关的列表
    listTypeInfo: {
      type: Object
    },
    // label宽度
    labelWidth: {
      type: String,
      default: '120px'
    },
    width: {
      type: String,
      default: '100%'
    },
    refObj: {
      type: Object
    }
  },
  data() {
    return {}
  },
  watch: {
    data: {
      // eslint-disable-next-line no-unused-vars
      handler: function(val) {
        // 将form实例返回到父级
        this.$emit('update:refObj', this.$refs.form)
      },
      deep: true // 深度监听
    }
  },
  mounted() {
    // 将form实例返回到父级
    this.$emit('update:refObj', this.$refs.form)
  },
  methods: {
    // 获取字段列表
    getConfigList() {
      return this.fieldList.filter(
        item =>
          !item.hasOwnProperty('show') ||
          (item.hasOwnProperty('show') && item.show)
      )
    },
    // 得到placeholder的显示
    getPlaceholder(row) {
      let placeholder
      if (row.type === 'input' || row.type === 'textarea') {
        if (row.placeholder != undefined) {
          placeholder = '请输入' + row.placeholder
        } else {
          placeholder = '请输入' + row.label
        }
      } else if (
        row.type === 'select' ||
        row.type === 'time' ||
        row.type === 'date'
      ) {
        if (row.placeholder != undefined) {
          placeholder = '请选择' + row.placeholder
        } else {
          placeholder = '请选择' + row.label
        }
      } else {
        placeholder = row.label
      }
      return placeholder
    },
    // 绑定的相关事件
    // eslint-disable-next-line no-unused-vars
    handleEvent(evnet, data) {
      this.$emit('handleEvent', evnet, this.data)
    },
    // 派发按钮点击事件
    // eslint-disable-next-line no-unused-vars
    handleClick(event, data) {
      this.$emit('handleClick', event, this.data)
    }
  }
}
</script>

<style lang="scss" scoped>
// 自定义form相关
.page-form {
  // .el-form-item{
  //   display: inline-block;
  //   // float: left;
  //   width: 48%;
  //   .el-form-item__content{
  //     .el-input, .el-select, .el-textarea{
  //       width: 240px;
  //     }
  //     .el-input-number{
  //       .el-input{
  //         width: inherit;
  //       }
  //     }
  //   }
  // }
  .el-form-block {
    display: block;
    width: 100%;
    .el-form-item__content {
      .el-textarea {
        width: 100%;
      }
    }
  }
}
.page-form-block {
  .el-form-item {
    display: block;
    .el-form-item__content {
      .el-input,
      .el-select,
      .el-textarea {
        width: inherit;
      }
      .el-input-number {
        .el-input {
          width: inherit;
        }
      }
    }
  }
  .el-form-block {
    display: block;
    width: 100%;
    .el-form-item__content {
      .el-textarea {
        width: 100%;
      }
    }
  }
}
</style>

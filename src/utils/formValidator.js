/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
export function install(Vue, options) {
  /**
   * 注意:  定义type 规则时 不用做非空验证
   *        只需要传入 required:true 即可
   * */
  /* 验证姓名*/
  const isUsername = (rule, value, callback) => {
    if (value != null && value != '') {
      if (!qq(value)) {
        callback(new Error('您输入的QQ号不正确!'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  }
  /* 验证手机号*/
  const isvalidateMobile = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('手机号不能为空'))
    } else {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('请输入正确的手机号'))
      }
    }
  }
  /* 含有非法字符(只能输入字母、汉字)*/
  const isvalidateRegexn = (rule, value, callback) => {
    if (value != null && value != '') {
      // eslint-disable-next-line no-undef
      if (!regexn(value)) {
        callback(new Error('含有非法字符(只能输入字母、汉字)!'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  }
  /* 请输入正整数*/
  const isvalidateInteger = (rule, value, callback) => {
    if (value != null && value != '') {
      if (!integer(value)) {
        callback(new Error('请输入正整数!'))
      } else {
        callback()
      }
    } else {
      callback()
    }
  }

  /**
   * 参数 item
   * required true  必填项
   * maxLength  字符串的最大长度
   * min 和 max 必须同时给 min < max  type=number
   * type 手机号 mobile
   *      邮箱   email
   *      网址   url
   *      各种自定义类型   定义在 src/utils/validate 中    持续添加中.......
   * */

  Vue.prototype.filter_rules = function(item) {
    const rules = []
    if (item.required) {
      rules.push({
        required: true,
        message: '该输入项为必填项!',
        trigger: 'blur'
      })
    }
    if (item.maxLength) {
      rules.push({
        min: 1,
        max: item.maxLength,
        message: '最多输入' + item.maxLength + '个字符!',
        trigger: 'blur'
      })
    }
    if (item.min && item.max) {
      rules.push({
        min: item.min,
        max: item.max,
        message: '字符长度在' + item.min + '至' + item.max + '之间!',
        trigger: 'blur'
      })
    }
    if (item.type) {
      const type = item.type
      switch (type) {
        case 'email':
          rules.push({
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur,change'
          })
          break
        case 'name':
          rules.push({
            type: 'name',
            validator: isUsername,
            trigger: 'blur,change'
          })
          break
        case 'mobile':
          rules.push({
            type: 'mobile',
            validator: isvalidateMobile,
            trigger: 'blur,change'
          })
          break
        case 'regexn':
          rules.push({ validator: isvalidateRegexn, trigger: 'blur,change' })
          break
        case 'integer':
          rules.push({ validator: isvalidateInteger, trigger: 'blur,change' })
          break
        default:
          rule.push({})
          break
      }
    }

    return rules
  }
}

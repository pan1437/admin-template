<template>
  <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="avatarUrl" alt="">
  </el-dialog>-->
  <el-upload
    ref="upload"
    :action="url"
    :headers="headersData"
    :show-file-list="showFile"
    :http-request="upLoad"
    :auto-upload="autoUpload"
    :data="uploadData"
    :before-upload="uploadBefore"
    :on-remove="uploadRemove"
    :on-progress="uploadProgress"
    :on-success="uploadSuccess"
    :on-error="uploadError"
    :file-list="fileList"
    :list-type="listType"
    :on-exceed="onExceed"
    :limit="limit"
    :disabled="disableds"
  >
    <div class="el-upload-list--picture-card" v-if="uploadType == 'avatar'">
      <span class="el-upload-list__item-actions">
        <i class="el-icon-upload"></i>
      </span>
      <img :src="avatarUrl" class="avatar" />
    </div>
    <!-- <i :class="icon" v-else-if="uploadType == 'image'"></i> -->
    <el-button slot="trigger" size="small" type="primary" v-else>
      {{
      autoUpload ? '点击上传' : '读取文件'
      }}
    </el-button>
    <el-button
      v-if="!autoUpload"
      style="margin-left: 10px;"
      size="small"
      type="success"
      @click="submitUpload"
    >开始上传</el-button>
    <div slot="tip" style="margin-top:-5px; padding: 10px 0; color:#ff4949">
      {{ uploadMessage }}
      <i v-if="uploadMessage == '正在上传'" class="el-icon-loading" />
    </div>
  </el-upload>
</template>

<script>
const OSS = require('ali-oss')
// import { getOss } from '@/apis/oss'

export default {
  props: {
    disableds: {
      type: Boolean,
      default: false
    },
    // 上传的地址
    url: {
      type: String,
      default: ''
    },
    limit: {
      type: Number
    },
    showFile: {
      type: Boolean,
      default: true
    },
    avatarUrl: {
      type: String,
      default: ''
    }, //如果是一个图
    // 显示上传的内容
    fileData: {
      type: Array
    },
    // 是否自动上传
    autoUpload: {
      type: Boolean,
      default: true
    },
    // 上传参数
    uploadData: {
      type: Object
    },
    // 上传的文件类型
    uploadType: {
      type: String,
      default: 'image'
    },
    icon: {
      type: String,
      default: 'el-icon-plus'
    },
    // 上传的文件个数
    uploadNums: {
      type: Number,
      default: -1
    },
    // 列表类型
    listType: {
      type: String,
      default: 'picture'
    },
    oss: {
      type: Object,
      default: () => {
        return {}
      }
    },
    ossType: {
      type: Object,
      default: () => {
        return {
          category: 'image',
          type: 'drug'
        }
      }
    },
    //限制图片大小
    uploadSize: {
      type: Object,
      default: () => {
        return
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      disabled: false,
      avatar: '',
      ossData: {},
      // listType: 'text', // 文件列表的类型
      checkType: true, // 检查文件类型
      headersData: {}, // 上传的文件数据
      fileList: [], // 上传成功的文件列表
      uploadMessage: '' // 上传的说明
    }
  },
  watch: {
    uploadType() {
      this.init()
    },
    fileList() {
      // 将内容派发到父组件
      this.$emit('cdHandleUpload', { fileList: this.fileList })
    },
    uploadMessage() {
      // 将内容派发到父组件
      this.$emit('cdHandleUpload', { uploadMessage: this.uploadMessage })
    },
    fileData() {
      if (this.uploadType != 'avatar') {
        this.fileList = JSON.parse(JSON.stringify(this.fileData))
      }
    },
    oss() {}
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    // 组件初始化
    init() {
      console.log()
      //  setTimeout(() => {
      //   if(Object.keys(this.oss).length == 0){
      //       getOss(this.ossType).then(res=>{
      //           this.ossData = res.data
      //       })
      //   }else{
      this.ossData = this.oss
      //   }
      //   }, 500);
      // 设置token
      // this.headersData = { Authorization: _getSessionStore('token') }
      if (this.listType === 'picture') {
        // 设置上传的类型
        if (this.uploadType === 'image') {
          this.$emit('update:listType', 'picture')
        } else {
          this.$emit('update:listType', 'text')
        }
      }
      // 显示已上传的文件
      if (this.fileData) {
        this.fileList = this.fileData
        //  JSON.parse(JSON.stringify(this.fileData))
      }
    },
    // eslint-disable-next-line no-unused-vars
    onExceed(files, fileList) {
      this.$message.error('最多上传' + this.limit + '个,请先删除再进行上传')
    },
    // 检查文件类型
    checkFileType(check) {
      let result = true
      switch (this.uploadType) {
        case 'image':
          if (
            check !== 'jpg' &&
            check !== 'gif' &&
            check !== 'png' &&
            check !== 'bmp' &&
            check !== 'raw' &&
            check !== 'jpeg'
          ) {
            this.uploadMessage = '请选择图片文件'
            result = false
          }
          break
        case 'avatar':
          if (
            check !== 'jpg' &&
            check !== 'gif' &&
            check !== 'png' &&
            check !== 'bmp' &&
            check !== 'raw' &&
            check !== 'jpeg'
          ) {
            this.uploadMessage = '请选择图片文件'
            result = false
          }
          break
        case 'json':
          if (check !== 'json') {
            this.uploadMessage = '请选择json文件'
            result = false
          }
          break
        case 'file':
          break
        default:
          this.uploadMessage = '请选择正确的文件格式'
          result = false
          break
      }
      this.checkType = result
      return result
    },
    // 手动触发上传
    submitUpload() {
      this.$refs.upload.submit()
    },
    // 文件上传之前
    uploadBefore(file) {
      if (Object.keys(this.oss).length == 0) {
        return false
      }
      const fileType = file.name.split('.')
      const len = fileType.length - 1
      // 判断上传文件的后缀名, 将后缀名都转换成小写做比较
      if (!this.checkFileType(fileType[len].toLowerCase())) {
        this.$refs.upload.abort(file)
        this.$emit('handleEvent', 'uploadBefore', file)
        return false
      }
      if (
        (this.uploadType == 'image' || this.uploadType == 'avatar') &&
        this.uploadSize
      ) {
        let _this = this
        const isSize = new Promise(function(resolve, reject) {
          let _URL = window.URL || window.webkitURL
          let img = new Image()
          img.onload = function() {
            let valid = file.width
              ? img.width == _this.uploadSize.width
              : 1 && img.height
              ? img.height == _this.uploadSize.height
              : 1
            valid ? resolve() : reject()
          }
          img.src = _URL.createObjectURL(file)
        }).then(
          () => {
            return file
          },
          () => {
            this.$message('请检查上传尺寸')
            return Promise.reject()
          }
        )
        return isSize
      }
      this.uploadMessage = '正在上传'
    },
    // 文件上传中
    uploadProgress(event, file, fileList) {
      // 如果类型检查失败不往下执行
      if (!this.checkType) {
        // 取消上传
        this.$refs.upload.abort(file)
        // 删除当前文件
        fileList.forEach((item, index) => {
          if (JSON.stringify(item) === JSON.stringify(file)) {
            fileList.splice(index, 1)
          }
        })
      }
    },
    // 文件上传成功
    uploadSuccess(res, file, fileList) {
      // 上传结果处理
      if (res.success) {
        this.uploadMessage = ''
        // this.fileList = fileList
        // 根据设置的文件个数做处理 -1为无限大
        if (this.uploadNums === -1 || fileList.length < this.uploadNums) {
          this.fileList = fileList
        } else if (fileList.length > this.uploadNums) {
          const Arr = []
          for (let i = 0, len = this.uploadNums; i < len; i++) {
            Arr.push(fileList[fileList.length - (i + 1)])
          }
          this.fileList = Arr
        }
      } else {
        // 删除当前文件
        fileList.forEach((item, index) => {
          if (JSON.stringify(item) === JSON.stringify(file)) {
            fileList.splice(index, 1)
          }
        })
        this.uploadMessage = '上传失败'
      }
      this.$message({
        showClose: true,
        message: res.success ? '上传成功' : '上传失败',
        type: res.success ? 'success' : 'error',
        duration: 3500
      })
      this.$emit('handleEvent', 'upload', res.success)
    },
    // 文件上传失败
    uploadError(error, file, fileList) {
      if (error) {
        return
      }
      // 删除当前文件
      fileList.forEach((item, index) => {
        if (JSON.stringify(item) === JSON.stringify(file)) {
          fileList.splice(index, 1)
        }
      })
      this.uploadMessage = '上传失败'
      this.$message({
        showClose: true,
        message: '上传失败',
        type: 'error',
        duration: 3500
      })
    },
    //aliy 参数
    infoClient() {
      const data = this.ossData
      //配置阿里云的参数
      return new OSS({
        region: 'oss-' + data.region,
        accessKeyId: data.AccessKeyId,
        accessKeySecret: data.AccessKeySecret,
        bucket: data.bucket,
        stsToken: data.SecurityToken
      })
    },
    // 文件移除时
    uploadRemove(file, fileList) {
      this.$emit('handleClick', 'uploadRemove', fileList)
    },
    /**
     * [upLoad 自定义上传图片]
     * @param  {[type]} file [上传值]
     * @return {[type]}      [description]
     */
    upLoad(file) {
      const self = this
      const files = file.file
      const point = files.name.lastIndexOf('.')
      const suffix = files.name.substr(point)
      const fileName = files.name.substr(0, point)
      const date = Date.parse(new Date())
      const fileNames = this.ossData.file.replace(
        '*',
        `${fileName}_${date}${suffix}`
      )
      // const fileNames = `${fileName}_${date}${suffix}`
      // fileNames上传文件的名称
      // file.file上传文件的内容
      this.infoClient()
        .multipartUpload(fileNames, file.file)
        .then(res => {
          // 下面是如果对返回结果再进行处理，根据项目需要
          if (res.res.status == 200) {
            this.uploadMessage = ''

            res.res.requestUrls[0] = res.res.requestUrls[0]
              .split('?')[0]
              .replace(
                'http://lsyl.oss-cn-shanghai.aliyuncs.com/',
                this.ossData.domain
              )
            this.$emit('handleClick', 'upLoad', res)
            // self.$message({
            //     message: '上传成功',
            //     type: 'success'
            // })
          }

          // eslint-disable-next-line handle-callback-err
        })
        .catch(err => {
          console.log(err)
          self.$message.error('上传失败')
        })
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 80px;
  border-radius: 4px;
}
</style>

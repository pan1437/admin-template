<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="
      "
    />
    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar == '' ? defaultImg : ''" class="user-avatar" />
          <span class="name">{{ name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/data/dataIndex">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="UpdatePassword"
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item divided @click.native="logout"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- <div class="_link">
     <router-link :to="{name:'menu'}"> <el-link :underline="false">系统设置</el-link></router-link>
    <router-link :to="{name:'fsIndex'}">  <el-link :underline="false">财务管理</el-link></router-link>
    </div> -->
    <page-dialog
      :title="dialogInfo.title[dialogInfo.type]"
      :visible.sync="dialogInfo.visible"
      :width="dialogInfo.width"
      :bt-loading="dialogInfo.btLoading"
      :bt-list="dialogInfo.type === 'view' ? undefined : dialogInfo.btList"
      @handleClick="handleClick"
    >
      <template slot>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="旧密码" prop="old_password">
            <el-input
              type="password"
              v-model="ruleForm.old_password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
    </page-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import PageDialog from '@/components/PageDialog/index'
import { updatePsd } from '@/apis/loginApi'
// import { deleteDate } from '../../utils/request'

// import { getDefaultImg } from '@/utils/auth'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        callback()
      }
    }
    var oldPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      name: '',
      defaultImg: require('@/assets/image/avatar.png'),
      ruleForm: {
        old_password: '',
        password: '',
        checkPass: ''
      },
      rules: {
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: ['blur', 'change']
          }
        ],
        old_password: [
          {
            required: true,
            validator: oldPassword,
            trigger: ['blur', 'change']
          }
        ],
        checkPass: [
          {
            required: true,
            validator: validatePass2,
            trigger: ['blur', 'change']
          }
        ]
      },
      // 弹窗相关
      dialogInfo: {
        width: '40%',
        title: {
          UpdatePassword: '修改密码'
        },
        visible: false,
        type: '',
        btLoading: false,
        btList: [
          {
            label: '关闭',
            type: '',
            icon: '',
            event: 'close',
            show: true
          },
          {
            label: '确定',
            type: 'primary',
            icon: '',
            event: 'save',
            saveLoading: false,
            show: true
          }
        ]
      }
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    PageDialog
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.defaultImg = require('@/assets/image/avatar.png')
      // this.name = getDefaultImg().username
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      await this.$store.dispatch('permission/removeRouter')
      // 退出清空菜单
      await this.$router.replace(`/login?redirect=${this.$route.fullPath}`)
      // location.reload()
    },
    UpdatePassword() {
      this.dialogInfo.visible = true
      this.dialogInfo.type = 'UpdatePassword'
    },
    // 按钮点击
    handleClick(event) {
      switch (event) {
        case 'close':
          this.dialogInfo.visible = false
          this.resetForm()
          break
        case 'save':
          this.$refs['ruleForm'].validate(valid => {
            if (valid) {
              this.$confirm('确认修改密码？')
                .then(() => {
                  delete this.ruleForm.checkPass
                  updatePsd(this.ruleForm).then(() => {
                    this.$message({
                      message: '修改成功！',
                      type: 'success'
                    })
                    this.dialogInfo.visible = false

                    this.logout()
                  })
                  // done();
                })
                .catch(() => {})
            } else {
              console.log('error submit!!')
              return false
            }
          })
          break
      }
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }
  ._link {
    float: right;
    line-height: 50px;
    margin-right: 2vw;
    a {
      margin: 0 10px;
    }
  }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .name {
          transform: translateY(-5px);
          cursor: pointer;
          display: inline-block;
        }
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

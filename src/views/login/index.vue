<template>
  <div class="modular">
    <div class="title-container">
      <h2 class="title">医链教育管理后台</h2>
    </div>
    <div class="login-container">
      <div class="login-content">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          style="width: 100%;"
          auto-complete="on"
          label-position="left"
          label-width="20px"
        >
          <el-form-item>
            <el-row>
              <el-col :span="2">
                <img class="image" src="../../assets/image/icon_name.png" />
              </el-col>
              <el-col :span="22">
                <el-input
                  ref="name"
                  v-model="loginForm.username"
                  placeholder="请输入用户名"
                  name="name"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                  clearable
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="2">
                <img class="image" src="../../assets/image/icon_cip.png" />
              </el-col>
              <el-col :span="22">
                <el-input
                  clearable
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="请输入密码"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.enter.native="handleLogin"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-row>
              <el-col :span="2">
                <img class="image" src="../../assets/image/icon_yzm.png" />
              </el-col>
              <el-col :span="22">
                <el-input
                  clearable
                  ref="captcha"
                  v-model="loginForm.captcha"
                  placeholder="请输入验证码"
                  name="name"
                  class="yzm"
                  type="text"
                  tabindex="1"
                  autocomplete="off"
                  @keyup.enter.native="handleLogin"
                />
              </el-col>

              <img
                :src="list.img"
                alt="验证码"
                class="yzm_img"
                @click="init()"
              />
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              round
              type="primary"
              style="width:100%"
              @click.native.prevent="handleLogin"
              >Login</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import { getToken } from '@/utils/auth' // get token from cookie
// import { menus } from '@/apis/loginApi'

import { captcha } from '@/apis/loginApi'
// import { validUsername } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    return {
      list: {}, // 二维码
      loginForm: {
        username: '',
        password: '',
        captcha: ''
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }
        ],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }
        ],
        captcha: [
          {
            required: true,
            trigger: 'blur',
            validator: validateCode
          }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  created() {
    this.init()
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    init() {
      captcha().then(res => {
        this.list = res.data
        localStorage.setItem('code', res.data.code)
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: '/' })
              // const routerPath =
              //   this.redirect === '/404' || this.redirect === '/401'
              //     ? '/'
              //     : this.redirect

              // this.$router.push({ path: routerPath || '/' }).catch(() => {})
              this.loading = false
            })
            .catch(() => {
              this.init()
              this.loading = false
            })
          //   try {
          //     await this.$store.dispatch('user/login', this.loginForm)
          //     const routerPath =
          //       this.redirect === '/404' || this.redirect === '/401'
          //         ? '/'
          //         : this.redirect

          //     this.$router.push({ path: routerPath || '/' }).catch(() => {})
          //     this.loading = false
          //   } catch {
          //     this.init()

          //     this.loading = false
          //   }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.modular {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-image: url('../../assets/image/bg.png');

  .title-container {
    margin-bottom: 30px;

    .title {
      color: #ffffff;
      text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.42);
    }
  }

  .login-container {
    width: 440px;
    height: 320px;
    background: #ffffff;
    box-shadow: 0px 5px 7px 1px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  }

  .login-content {
    width: 100%;
    padding: 30px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    .image {
      vertical-align: middle;
    }

    .yzm_img {
      position: absolute;
      right: 0px;
      top: 5px;
    }
  }
}
</style>

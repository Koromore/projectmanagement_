<template>
  <div class="login">
    <div class="login_bgc">
      <h1 class="login-title">项目管理看板</h1>
      <div class="login-div">
        <div class="login-box" v-show="login_tab == 1">
          <div class="login-input">
            <!-- 账号登录 -->
            <el-form ref="form" :model="form">
              <el-form-item>
                <el-input autocomplete="off" clearable v-model="form.username" placeholder="姓名">
                  <i slot="prefix" class="el-input__icon el-icon-s-custom"></i>
                </el-input>
              </el-form-item>
              <el-form-item v-if="visible" autocomplete="off">
                <el-input type="password" v-model="form.password" placeholder="密码">
                  <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                  <i
                    slot="suffix"
                    @click="changePass('show')"
                    style="cursor:pointer;"
                    class="el-input__icon pwdoff"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 128 64"
                      id="icon-eye"
                      width="100%"
                      height="100%"
                    >
                      <path
                        fill="#889aa4"
                        d="M127.072 7.994c1.37-2.208.914-5.152-.914-6.87-2.056-1.717-4.797-1.226-6.396.982-.229.245-25.586 32.382-55.74 32.382-29.24 0-55.74-32.382-55.968-32.627-1.6-1.963-4.57-2.208-6.397-.49C-.17 3.086-.399 6.275 1.2 8.238c.457.736 5.94 7.36 14.62 14.72L4.17 35.96c-1.828 1.963-1.6 5.152.228 6.87.457.98 1.6 1.471 2.742 1.471s2.284-.49 3.198-1.472l12.564-13.983c5.94 4.416 13.021 8.587 20.788 11.53l-4.797 17.418c-.685 2.699.686 5.397 3.198 6.133h1.37c2.057 0 3.884-1.472 4.341-3.68L52.6 42.83c3.655.736 7.538 1.227 11.422 1.227 3.883 0 7.767-.49 11.422-1.227l4.797 17.173c.457 2.208 2.513 3.68 4.34 3.68.457 0 .914 0 1.143-.246 2.513-.736 3.883-3.434 3.198-6.133l-4.797-17.172c7.767-2.944 14.848-7.114 20.788-11.53l12.336 13.738c.913.981 2.056 1.472 3.198 1.472s2.284-.49 3.198-1.472c1.828-1.963 1.828-4.906.228-6.87l-11.65-13.001c9.366-7.36 14.849-14.474 14.849-14.474z"
                      />
                    </svg>
                  </i>
                </el-input>
              </el-form-item>
              <el-form-item v-else autocomplete="off">
                <el-input type="text" v-model="form.password" placeholder="密码">
                  <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                  <i
                    slot="suffix"
                    @click="changePass('hide')"
                    style="cursor:pointer;"
                    class="el-input__icon pwdopen"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1024 1024"
                      id="icon-eye-open"
                      width="100%"
                      height="100%"
                    >
                      <path
                        fill="#889aa4"
                        d="M512 128q69.675 0 135.51 21.163t115.498 54.997 93.483 74.837 73.685 82.006 51.67 74.837 32.17 54.827L1024 512q-2.347 4.992-6.315 13.483T998.87 560.17t-31.658 51.669-44.331 59.99-56.832 64.34-69.504 60.16-82.347 51.5-94.848 34.687T512 896q-69.675 0-135.51-21.163t-115.498-54.826-93.483-74.326-73.685-81.493-51.67-74.496-32.17-54.997L0 513.707q2.347-4.992 6.315-13.483t18.816-34.816 31.658-51.84 44.331-60.33 56.832-64.683 69.504-60.331 82.347-51.84 94.848-34.816T512 128.085zm0 85.333q-46.677 0-91.648 12.331t-81.152 31.83-70.656 47.146-59.648 54.485-48.853 57.686-37.675 52.821-26.325 43.99q12.33 21.674 26.325 43.52t37.675 52.351 48.853 57.003 59.648 53.845T339.2 767.02t81.152 31.488T512 810.667t91.648-12.331 81.152-31.659 70.656-46.848 59.648-54.186 48.853-57.344 37.675-52.651T927.957 512q-12.33-21.675-26.325-43.648t-37.675-52.65-48.853-57.345-59.648-54.186-70.656-46.848-81.152-31.659T512 213.334zm0 128q70.656 0 120.661 50.006T682.667 512 632.66 632.661 512 682.667 391.339 632.66 341.333 512t50.006-120.661T512 341.333zm0 85.334q-35.328 0-60.33 25.002T426.666 512t25.002 60.33T512 597.334t60.33-25.002T597.334 512t-25.002-60.33T512 426.666z"
                      />
                    </svg>
                  </i>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="form.remember">记住账号信息</el-checkbox>
                <el-link type="primary" class="wx_login" @click="wx_login">微信登录</el-link>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('form')">身份验证</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <!-- 微信登录 -->
        <div class="wx_login_box" v-show="login_tab == 2">
          <!-- <el-link type="primary" class="input_login" @click="input_login">账号登录</el-link> -->
          <div>微信登录</div>
          <img src="static/images/login/wxcode.png" width="49%" alt srcset />
          <div>请使用微信扫描二维码登录</div>
          <div>“映盛项目管理系统”</div>
          <br />
          <el-link type="primary" class="wx_login" @click="wx_login">账号密码登录</el-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      login_tab: 1,
      form: {
        username: '', //姓名
        password: '', //密码
        remember: false //是否记住密码
      },
      loginState: true, // 避免多次点击
      visible: true // 切换密码显示状态
    }
  },
  methods: {
    wx_login() {
      let login_tab = this.login_tab
      if (login_tab == 1) {
        this.login_tab = 2
      } else if (login_tab == 2) {
        this.login_tab = 1
      }
    },
    input_login() {
      this.login_tab = 1
    },
    submitForm(formName) {
      if (!this.loginState) return
      this.loginState = false

      if (this.form.username === '') {
        this.$alert('请填写用户昵称！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.loginState = true
          }
        })
        return false
      } else if (this.form.password === '') {
        this.$alert('请填写密码！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.loginState = true
          }
        })
        return false
      } else {
        //登录
        this.loginFn()
      }
    },
    loginFn() {
      this.$router.push({ path: '/home' })
      // this.$axios.post('/mengdian_manage/admin.php?mod=login&ac=login',this.$qs.stringify({
      //     username:this.form.username,
      //     password:this.form.password
      // })).then((res)=>{
      //     this.loginState = true;

      //     if(res.data.result){
      //         let userInfo = {
      //             username:this.form.username,
      //             password:this.form.password,
      //             remember:this.form.remember?'yes':'no'
      //         }
      //         //每次登陆后就设置 isLogin
      //         window.sessionStorage.setItem('isLogin','success');

      //         console.log(res.data.admin_typeid);
      //         if(res.data.user_id == '1'){
      //             this.$store.commit('changeState','error')
      //         }else{
      //             this.$store.commit('changeState','success')
      //         }

      //         this.$store.commit('login',userInfo)
      //         this.$router.push({ path: '/pages/home' })

      //     }else{
      //         this.$alert(res.data.message, '提示', {
      //             confirmButtonText: '确定',
      //             callback: action => {

      //             }
      //         });
      //     }
      // })
    },
    getlocalStorage() {
      //设置记住密码的默认状态
      try {
        let remember = localStorage.getItem('remember') === 'yes' ? true : false

        if (remember) {
          this.form.username = localStorage.getItem('username')
          this.form.password = localStorage.getItem('password')
          this.form.remember = true
        } else {
          this.form.username = '' //姓名
          ;(this.form.password = ''), //密码
            (this.form.remember = false) //是否记住密码
        }
      } catch (e) {
        console.log(e)
      }
    },
    changePass(value) {
      this.visible = !(value === 'show')
    } //判断渲染，true:暗文显示，false:明文显示
  },
  mounted() {
    // this.getlocalStorage();
  }
}
</script>
<style scoped>
.login {
  height: 100vh;
  background: url('../../../static/images/login/login_bg.png') 0 0 no-repeat
    black;
}
.login_bgc {
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}
.login-title {
  width: 100%;
  padding: 150px 0px;
  font-size: 40px;
  color: #fff;
  /* background-color: #004289; */
  text-align: center;
}
.login-div {
  max-width: 500px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.2);
  margin: auto;
  margin-top: -80px;
}
.login-box {
  height: 280px;
  width: 100%;
  background: #fff;
}
.login-input {
  max-width: 280px;
  margin: auto;
  height: 100%;
  /* height: 320px; */
  box-sizing: border-box;
  padding-top: 40px;
}
.login .el-checkbox__inner {
  width: 20px;
  height: 20px;
}
.login .el-checkbox__inner::after {
  height: 10px;
  left: 7px;
  top: 3px;
}
.login .el-form-item {
  margin-bottom: 12px;
}
.login .el-button {
  width: 100%;
}
.pwdopen {
  width: 16px;
  display: inline-block;
}
.pwdoff {
  width: 16px;
  display: inline-block;
}
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.login .wx_login {
  height: 18px;
}
.login .wx_login_box {
  position: relative;
  padding: 13px 0;
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.login .wx_login_box div {
  color: rgba(127, 129, 130, 1);
}
.login .wx_login_box div:nth-of-type(1) {
  font-size: 32px;
  color: black;
  font-weight: bold;
}
.login .wx_login_box .input_login {
  position: absolute;
  top: 0;
  right: 0;
}
</style>

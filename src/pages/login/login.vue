<template>
  <div class="login" :style="lgoin_style">
    <div class="login-div">
      <div class="login-box">
        <div class="title" v-if="loginType == 1">欢迎，登录项目管理系统</div>
				<div class="title wx_title" v-if="loginType == 2">微信登录</div>
        <div class="login-input" v-if="loginType == 1">
          <el-form ref="form" :model="form" label-width="49px">
            <el-form-item label="账号">
              <el-input autocomplete="off" clearable v-model="form.jobnumber" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="form.remember">记住密码</el-checkbox>
              <el-link type="primary" class="tab" @click="wx_login">微信登录</el-link>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
				<div class="wxlogin" v-if="loginType == 2">
					<img src="/static/images/login/wxcode.png" width="49%" alt="" srcset="">
					<div>请使用微信扫描二维码登录</div>
					<div>“映盛项目管理系统”</div>
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
      form: {
        jobnumber: '', // 账号
        password: '', // 密码
        remember: false // 是否记住密码
      },
      loginState: true, // 避免多次点击
			lgoin_style: '',
			loginType: 1,
			wxlogin_url: ''
    }
  },
  // 方法
  methods: {
		// 获取浏览器宽高
    widthheight() {
      let winWidth = window.innerWidth
      let winHeight = window.innerHeight
      this.lgoin_style = 'height:' + winHeight + 'px;'
		},
		// 切换微信登录
		wx_login(){
			this.loginType = 2
		},
    submitForm(formName) {
      if (!this.loginState) return
      this.loginState = false

      if (
        this.form.jobnumber === '' ||
        this.form.password === ''
      ) {
        this.$alert('请将信息填写完整！', '提示', {
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
      let params = new URLSearchParams()
      params.append('number', this.form.jobnumber)
      params.append('password', this.form.password)
      params.append('remember', this.form.remember ? 'yes' : 'no')
      this.$axios
        .post('/api/index.php?mod=login&ac=login', params)
        .then(this.loginSuccess)
    },
    loginSuccess(res) {
      //艾辉
      //6000020
      this.loginState = true
      if (res.data.result) {
        let userInfo = {
          number: this.form.jobnumber,
          password: this.form.password,
          remember: this.form.remember ? 'yes' : 'no'
        }
        //每次登陆后就设置 isLogin
        window.sessionStorage.setItem('isLogin', 'success')

        this.$store.commit('login', userInfo)
        this.$router.push({ path: '/home' })
      } else {
        this.$alert('您输入的信息有误请重新输入！', '提示', {
          confirmButtonText: '确定',
          callback: action => {}
        })
      }
    },
    getlocalStorage() {
      //设置记住密码的默认状态
      try {
        let remember = localStorage.getItem('remember') === 'yes' ? true : false

        if (remember) {
          this.form.jobnumber = localStorage.getItem('jobnumber')
          this.form.password = localStorage.getItem('password')
          this.form.remember = true
        } else {
          // console.log('无数据')
          // this.form.jobnumber = ''; //工号
          // this.form.password = '',  //密码
          // this.form.remember = false;  //是否记住密码
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  // 钩子函数
  mounted() {
    this.widthheight()
    this.getlocalStorage()
  }
}
</script>
<style scoped>
.login {
  background: url('/static/images/login/login_bg.png') 0 0 no-repeat black;
}
.login-title {
  width: 100%;
  padding: 150px 0px;
  font-size: 40px;
  color: #fff;
  background-color: #004289;
  text-align: center;
}
.login-div {
  width: 100%;
  height: 100%;
  padding-top: 20%;
  background: rgba(0, 0, 0, 0.6);
  margin: auto;
}
.login-box {
  height: 360px;
  width: 500px;
  margin: 0 auto;
  background: #fff;
  border-radius: 3px;
}
.title {
  text-align: center;
  font-family: SourceHanSansSC;
  font-weight: 400;
  font-size: 32px;
  color: rgb(16, 16, 16);
  font-style: normal;
  letter-spacing: 0px;
  line-height: 54px;
  text-decoration: none;
}
.wx_title{
	font-weight: bold;
}
.login-input {
  max-width: 320px;
  margin: auto;
  height: 100%;
  height: 320px;
  padding-top: 24px;
}
.login >>> .el-input__inner{
	height: 28px;
	border: 1px solid rgb(31,31,31);
}
.login .el-form-item {
  margin-bottom: 13px;
}
.login .el-form-item:nth-of-type(2n+1) {
  margin-bottom: 32px;
}
.tab {
  float: right;
}
.login .el-button {
  width: 100%;
}
.login .wxlogin{
	display: flex;
	flex-flow: wrap;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-family: SourceHanSansSC;
	font-size: 16px;
	color: rgba(127, 129, 130, 1);
}
</style>

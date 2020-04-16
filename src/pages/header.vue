<template>
  <div class="topheader">
    <el-row>
      <el-header style="height: 75px;">
        <img src="static/images/hander/logo.png" height="72" class="logo" alt srcset />
        <div class="header-right">
          <div class="add_du problemList" @click="problemList" :style="problemListStyle">
            <i class="el-icon-warning-outline"></i>
            反馈列表
          </div>
          <el-tooltip class="item" effect="dark" content="新建项目" placement="bottom">
            <div class="add_du" @click="add_box">
              <i class="el-icon-circle-plus-outline"></i>
              创建
            </div>
          </el-tooltip>
          <div class="message" @click="message">
            <el-badge :value="messageNum" class="item" :hidden="messageShow">
              <i class="el-icon-bell"></i>
            </el-badge>
            <span>消息</span>
          </div>
          <!-- 头像 -->
          <div class="usual">
            <div class="portrait">
              <img style="width:100%;height:100%;" :src="this.$store.state.user.headPortrait" alt />
            </div>
            <el-dropdown trigger="hover">
              <span class="el-dropdown-link" style="color:#fff;">
                {{this.$store.state.user.realName}}
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="clearfix">
                  <span @click="logout">退出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'topheader',
  props: {
    unread: Number
  },
  data() {
    return {
      userId: this.$store.state.user.userId,
      drawer: true,
      problemListStyle: '', // 反馈列表按钮样式
      // 未读消息数据
      messageNum: 0,
      messageShow: false
      // drawer2: true,
    }
  },
  // 侦听器
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    unread: function(newQuestion, oldQuestion) {
      // console.log(this.unread)
      this.countIsRead()
    }
  },
  // 钩子函数
  mounted() {
    this.countIsRead()
    this.problemListStyleCange()
  },
  methods: {
    logout() {
      //退出登录
      // this.$store.commit('logout');
      // this.$router.push({ path: '/logout' })
      this.$axios
        .post('/pmbs/api/logout?userId=' + this.$store.state.user.userId, {})
        .then(res => {
          console.log(res)
          if (res.data.errcode == 0) {
            //退出登录
            this.$store.commit('clearToken')
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })
    },
    // 向父组件传值打开新增项目抽屉
    add_box() {
      this.$emit('func', this.drawer)
    },
    // 向父组件传值打开消息面板抽屉
    message() {
      this.$emit('message', {})
      // console.log(1)
    },
    // 
    // 未读消息数量
    countIsRead(){
      let userId = this.userId
      let data =`?userId=${userId}`
      this.$axios
        .post('/pmbs/api/message/countIsRead' + data)
        .then(res => {
          if (res.status == 200) {
            let data = res.data
            this.messageNum = data
            if (data == 0) {
              this.messageShow = true
            }else{
              this.messageShow = false
            }
          }
        })
    },
    // 跳转问题反馈页面
    problemListStyleCange(){
      let userId = this.userId
      let userIdList = [4001, 147, 4023, 820, 10, 9, 3985, 266, 3962]
      let show = false
      userIdList.forEach(element => {
        if (element == userId) {
          show = true
        }
      })
      if (show) {
        this.problemListStyle = 'opacity: 100;'
      }else{
        this.problemListStyle = 'opacity: 0;'
      }
    },
    problemList(){
      let userId = this.userId
      let userIdList = [4001, 147, 4023, 820, 10, 9, 3985, 266, 3962]
      let show = false
      userIdList.forEach(element => {
        if (element == userId) {
          show = true
        }
      })
      if (show) {
        this.$router.push({ path: '/problem'})
      }else{
      }
    }
  }
}
</script>
<style >
.topheader {
  padding-bottom: 75px;
  background-color: rgb(13, 13, 13);
  position: fixed;
  top: 0;
}
.topheader .message{
  font-size: 16px;
  color: white;
}
.header-left {
  height: 75px;
  line-height: 75px;
  color: #409eff;
  font-size: 28px;
  float: left;
}
.header-right {
  width: 432px;
  float: right;
  color: #555555;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.header-right .problemList{
  opacity: 0;
}
.header-right .add_du {
  color: white;
  font-size: 16px;
}
.header-right .add_du i {
  font-size: 18px;
}
.header-right .el-icon-bell {
  color: white;
  font-size: 24px;
}
.topheader .el-dropdown {
  font-size: 15px;
}
.el-dropdown-menu {
  min-width: 160px;
}
.el-dropdown-menu span {
  text-align: center;
  display: block;
}
.topheader .el-header {
  padding: 0px 50px;
  position: fixed;
  top: 0;
  width: 100%;
  background: rgb(13, 13, 13);
  z-index: 1000;
  -webkit-box-shadow: 0 0 15px #d5d3d8;
  box-shadow: 0 0 15px #d5d3d8;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.topheader .el-header .logo {
  height: 49px;
}
.el-badge__content {
  border: 0;
}

.topheader .records_box {
  height: 100%;
}
.topheader .records {
  height: 100%;
}
.topheader .records .title {
  font-weight: bold;
  height: 100px;
  line-height: 100px;
}
.topheader .records .el-card {
  font-size: 16px;
}
.topheader .records .el-card:hover {
  background: #eee;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.topheader .portrait {
  width: 40px;
  height: 40px;
  font-size: 16px;
  text-align: center;
  border-radius: 50%;
  /*background: white;*/
  overflow: hidden;
}
.usual {
  width: 121px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
</style>

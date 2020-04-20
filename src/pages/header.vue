<template>
  <div class="topheader">
    <el-row>
      <el-header>
        <img src="static/images/hander/logo.png" class="logo" @click="toHome" alt srcset />
        <div class="header-right">
          <el-input
            placeholder="请输入内容"
            v-model="searchWord"
            class="input-with-select search"
            size="small"
            clearable
            :disabled="searchDisabled"
            @keyup.enter.native="searchStart"
            @clear="searchStart"
          >
            <el-select v-model="select" slot="prepend" placeholder="请选择" :disabled="searchDisabled">
              <el-option label="项目" value="1"></el-option>
              <el-option label="任务" value="2"></el-option>
              <el-option label="文档" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="searchStart" :disabled="searchDisabled"></el-button>
          </el-input>
          <el-tooltip class="item" effect="dark" content="新建项目" placement="bottom">
            <div class="add_du" @click="add_box">
              <i class="el-icon-circle-plus-outline"></i>
              <span>创建</span>
            </div>
          </el-tooltip>
          <div class="message" @click="message">
            <el-badge :value="messageNum" class="item" :hidden="messageShow">
              <i class="el-icon-bell"></i>
            </el-badge>
          </div>
          <!-- 头像 -->
          <div class="usual">
            <div class="portrait"></div>
            <span class="el-dropdown-link">
              你好，
              {{this.$store.state.user.realName}}
              <i
                class="el-icon-switch-button"
                @click="logout"
              ></i>
            </span>
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
      messageShow: false,
      searchDisabled: false,
      select: '1', // 搜索维度
      searchWord: '', // 搜索关键字
      searchWordKey: 0
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
    countIsRead() {
      let userId = this.userId
      let data = `?userId=${userId}`
      this.$axios.post('/pmbs/api/message/countIsRead' + data).then(res => {
        if (res.status == 200) {
          let data = res.data
          this.messageNum = data
          if (data == 0) {
            this.messageShow = true
          } else {
            this.messageShow = false
          }
        }
      })
    },

    // 首页
    toHome() {
      this.$router.push({ path: '/home' })
    },
    // 开始搜索
    searchStart(){
      let select = this.select // 搜索维度
      this.searchWordKey+1
      let searchWord = {
        key: this.searchWordKey,
        value: this.searchWord
      }
      // this.searchWord // 搜索关键字
      // console.log(select)
      // console.log(searchWord)
      let oldUrl = this.$route.path
      // console.log(oldUrl)
      let url1 = '/home/components/project'
      let url2 = '/home/components/task'
      let url3 = '/home/components/document'
      if (select == 1 && oldUrl != url1) {
        this.$router.push({ path: url1 })
      }else if (select == 2 && oldUrl != url2) {
        this.$router.push({ path: url2 })
      }else if (select == 3 && oldUrl != url3) {
        this.$router.push({ path: url3 })
      }
      // this.$router.push({ path: url })
      this.$emit('sousuo', searchWord)
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
.topheader .message {
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
  /* width: 300px; */
  width: 600px;
  float: right;
  color: #555555;
  font-size: 18px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.header-right .search {
  width: 281px;
  background: none;
  color: white;
  /* opacity: 0; */
}
.header-right .search div,
.header-right .search input{
  color: white;
  background: none;
}
.topheader .el-select .el-input {
  width: 72px;
}
/* .topheader .input-with-select .el-input-group__prepend {
  background-color: #fff;
} */
.header-right .add_du {
  width: 54px;
  height: 24px;
  line-height: 24px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.header-right .add_du i {
  font-size: 18px;
}
.header-right .el-icon-bell {
  color: white;
  font-size: 24px;
  cursor: pointer;
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
  height: 60px;
  padding-right: 24px;
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
  height: 40px;
  cursor: pointer;
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
.usual {
  width: 128px;
  height: 32px;
  line-height: 32px;
  padding-left: 9px;
  border-left: 1px solid white;
  font-size: 16px;
  color: white;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.usual i {
  font-size: 18px;
  cursor: pointer;
}
</style>

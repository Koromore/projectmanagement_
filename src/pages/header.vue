<template>
  <div class="topheader">
    <el-header style="height: 75px;">
      <!-- <h2 class="header-left">V客联盟自媒体录入系统</h2> -->
      <img src="/static/images/hander/logo.png" class="logo" alt srcset />
      <div class="header-right">
        <!-- <i class="el-icon-bell"></i> -->
        <el-badge :value="3" class="item">
          <img src="/static/images/hander/news.png" alt srcset />
					
        </el-badge>
				<!-- <div>消息</div> -->
        
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link">
            <!-- {{this.$store.state.username}} -->
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
              <router-link tag="span" to="/changePassword">修改密码</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided class="clearfix">
              <span @click="logout">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
  </div>
</template>
<script>
export default {
  name: 'topheader',
  data() {
    return {}
  },
  methods: {
    logout() {
      //退出登录
      // this.$store.commit('logout');
      // this.$router.push({ path: '/logout' })
    }
  }
}
</script>
<style >
/* header{
	background: rgb(13, 13, 13);
} */
.topheader {
  padding-bottom: 75px;
  height: 0px;
  background-color: rgb(13, 13, 13);
}
.header-left {
  height: 75px;
  line-height: 75px;
  color: #409eff;
  font-size: 28px;
  float: left;
}
.header-right {
  float: right;
  height: 20px;
  line-height: 20px;
  color: #555555;
  font-size: 18px;
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
  height: 90%;
}
.el-badge__content{
	border: 0;
}
</style>

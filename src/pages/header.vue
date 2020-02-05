<template>
    <div class="topheader">
        <el-header style="height:86px;">
            <h2 class="header-left">V客联盟自媒体录入系统</h2>
            <div class="header-right">
                <i class="el-icon-bell"></i>
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link">
                        {{this.$store.state.username}}<i class="el-icon-caret-bottom el-icon--right"></i>
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
    name:'topheader',
    data() {
        return {

        }
    },
    methods:{
        logout(){
            //退出登录
            this.$store.commit('logout');
            this.$router.push({ path: '/logout' })
        }
    }
};
</script>
<style>
.topheader{
    padding-bottom: 86px;
    height: 0px;
}
.header-left{
    height: 86px;
    line-height: 86px;
    color: #409EFF;
    font-size: 28px;
    float: left;
}
.header-right{
    margin-top: 33px;
    float: right;
    height: 20px;
    line-height: 20px;
    color: #555555;
    font-size: 18px;
    cursor: pointer;
}
.topheader .el-dropdown{
    font-size: 15px;
}
.el-dropdown-menu{
    min-width: 160px;
}
.el-dropdown-menu span{
    text-align: center;
    display: block;
}
.topheader .el-header {
  padding: 0px 50px;
  position: fixed;
  top: 0;
  width: 100%;
  background: #f8f8f8;
  z-index: 1000;
  -webkit-box-shadow: 0 0 15px #d5d3d8;
  box-shadow: 0 0 15px #d5d3d8;
}
</style>

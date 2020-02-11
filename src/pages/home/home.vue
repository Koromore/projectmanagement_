<template>
  <div class="home">
    <Header></Header>
    <el-container :style="home_style">
      <el-aside width="360px" style="background-color: rgb(238, 241, 246)">
        <!-- 左菜单栏 -->
        <div :class="[show_acti=='1'?'title act':'title']" @click="change_show(1)">
          <i class="el-icon-s-home"></i>
          统计
        </div>
        <div :class="[show_acti=='2'?'title act':'title']" @click="change_show(2)">
          <i class="el-icon-tickets"></i>
          项目管理
        </div>
        <div :class="[show_acti=='3'?'title act':'title']" @click="change_show(3)">
          <i class="el-icon-finished"></i>
          任务管理
        </div>
        <div :class="[show_acti=='4'?'title act':'title']" @click="change_show(4)">
          <i class="el-icon-folder-opened"></i>
          文档管理
        </div>
        <div :class="[show_acti=='5'?'title act':'title']" @click="change_show(5)">
          <i class="el-icon-setting"></i>
          设置
        </div>
      </el-aside>

      <el-container>
        <!-- 内容 -->
        <el-main>
          <Statistics v-if="show_acti == 1"></Statistics>
          <Project v-if="show_acti == 2" @on-close="beClose"></Project>
          
          <Task v-if="show_acti == 3"></Task>
          <Document v-if="show_acti == 4"></Document>
          <Set v-if="show_acti == 5"></Set>
          <ProjectDetails v-if="show_acti == 6"></ProjectDetails>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>
<script>
import Header from '@/pages/header'
import Statistics from '@/components/statistics'
import Project from '@/components/project'
import ProjectDetails from '@/components/project_details'
import Task from '@/components/task'
import Document from '@/components/document'
import Set from '@/components/set'

export default {
  name: 'login',
  components: {
    Header,
    Project,
    Statistics,
    Task,
    ProjectDetails,
    Document,
    Set
  },
  data() {
    return {
      home_style: '',
      show_acti: 2
    }
  },
  // 方法
  methods: {
    // 获取浏览器宽高
    widthheight() {
      let winWidth = window.innerWidth
      let winHeight = window.innerHeight
      let height = winHeight - 75
      this.home_style = 'height:' + height + 'px;'
    },
    // 页面切换
    change_show(e) {
      this.show_acti = e
    },
    // 项目详情页面显示
    beClose(e){
      console.log(e)
      this.show_acti = 6
    }
  },
  // 钩子函数
  mounted() {
    this.widthheight()
  }
}
</script>
<style scoped>
.el-icon-arrow-down {
  display: none;
}
.el-aside {
  padding-top: 36px;
}
.el-aside .title {
  /* background: red; */
  font-family: 'SourceHanSansSC';
  font-size: 20px;
  color: rgb(16, 16, 16);
  padding: 0 20px;
  cursor: pointer;
  -webkit-transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 56px;
  line-height: 56px;
  position: relative;
  -webkit-box-sizing: border-box;
  white-space: nowrap;
  list-style: none;
}
.el-aside .title:hover{
  background: #fff;
}
.el-aside .title.act{
  background: #fff;
}
.el-aside .title i {
  width: 24px;
  font-size: 24px;
  margin-right: 5px;
}
</style>

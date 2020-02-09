<template>
  <div class="home">
    <Header></Header>
    <el-container :style="home_style">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!-- 左菜单栏 -->
        <div class="title">
          <i class="el-icon-s-home"></i>
          统计
        </div>
        <div class="title">
          <i class="el-icon-tickets"></i>
          项目管理
        </div>
        <div class="title">
          <i class="el-icon-finished"></i>
          任务管理
        </div>
        <div class="title">
          <i class="el-icon-folder-opened"></i>
          文档管理
        </div>
        <div class="title">
          <i class="el-icon-setting"></i>
          设置
        </div>
      </el-aside>

      <el-container>
        <!-- 内容 -->
        <el-main>
          <!-- <Project></Project> -->
          <Statistics></Statistics>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>
<script>
import Header from '@/pages/header'
import Project from '@/components/project'
import Statistics from '@/components/statistics'
export default {
  name: 'login',
  components: {
    Header,
    Project,
    Statistics
  },
  data() {
    // const item = {
    //   date: '2016-05-02',
    //   name: '王小虎',
    //   address: '上海市普陀区金沙江路 1518 弄'
    // }
    return {
      home_style: ''
      // tableData: Array(20).fill(item)
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
.el-aside .title i {
  width: 24px;
  font-size: 24px;
  margin-right: 5px;
}
</style>

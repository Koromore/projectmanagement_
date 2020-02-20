<template>
  <div class="home">
    <Header @func="getMsgFormSon"></Header>
    <el-container style="height: 100vh; padding-top: 75px;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!-- 左菜单栏 -->
        <div :class="[show_acti=='1'?'title act':'title']" @click="change_show(1,'statistics')">
          <i class="el-icon-s-home"></i>
          统计
        </div>
        <div
          :class="[show_acti=='2' || show_acti=='6'?'title act':'title']"
          @click="change_show(2,'project')"
        >
          <i class="el-icon-tickets"></i>
          项目管理
        </div>
        <div :class="[show_acti=='3'?'title act':'title']" @click="change_show(3,'task')">
          <i class="el-icon-finished"></i>
          任务管理
        </div>
        <div :class="[show_acti=='4'?'title act':'title']" @click="change_show(4,'document')">
          <i class="el-icon-folder-opened"></i>
          文档管理
        </div>
        <div :class="[show_acti=='5'?'title act':'title']" @click="change_show(5,'set')">
          <i class="el-icon-setting"></i>
          设置
        </div>
      </el-aside>

      <el-container>
        <!-- 内容 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!-- 抽屉 -->
    <el-drawer title="添加任务" :visible.sync="drawer" :with-header="false">
      <el-row class="add_box">
        <el-col :span="24" class="title">创建项目</el-col>
        <el-col :span="6" class="title title1">名称</el-col>
        <el-col :span="13">
          <el-input placeholder="请输入内容" v-model="new_task.parent_task" clearable></el-input>
        </el-col>
        <el-col :span="6" class="title title1">分类</el-col>
        <el-col :span="13">
          <el-input placeholder="请输入内容" v-model="new_task.new_name" clearable></el-input>
        </el-col>
        <el-col :span="18" :offset="6">
          <el-radio v-model="radio1" label="1">专项</el-radio>
          <el-radio v-model="radio1" label="2">日常</el-radio>
        </el-col>

        <el-col :span="6" class="title title1">预计时间</el-col>
        <el-col :span="13" class="presetTime">
          <el-date-picker v-model="new_task.presetTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>

        <el-col :span="6" class="title title1">需求</el-col>
        <el-col :span="13">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 8}"
            placeholder="请输入内容"
            v-model="new_task.demand"
          ></el-input>
        </el-col>
        <el-col :span="18" :offset="6">
          <el-radio v-model="radio2" label="1">项目经理</el-radio>
          <el-radio v-model="radio2" label="2">执行部门</el-radio>
        </el-col>
        <el-col :span="16" :offset="3" v-show="radio2 == 1">
          <el-input placeholder="请输入内容" v-model="new_task.parent_task" clearable></el-input>
        </el-col>
        <el-col :span="16" :offset="3" v-show="radio2 == 2">
          <el-checkbox-group v-model="checkList" class="check_box">
            <el-checkbox label="武汉策划"></el-checkbox>
            <el-checkbox label="上海研发"></el-checkbox>
            <el-checkbox label="北京网络销售"></el-checkbox>
            <el-checkbox label="武汉内容"></el-checkbox>
            <el-checkbox label="上海项目"></el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :span="24">
          <el-col :span="6" class="title title1">知晓人</el-col>
        </el-col>
        <el-col :span="18" :offset="3" class="know_pop">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
        </el-col>

        <el-col :span="9" :offset="3">
          <el-input placeholder="请输入内容" v-model="add_list" clearable></el-input>
        </el-col>
        <el-col :span="6" :offset="1">
          <el-button size="small" type="primary" @click="showInput">添加</el-button>
        </el-col>
        <el-col :span="12" :offset="7" class="batton">
          <el-button size="small" type="info">取消</el-button>
          <el-button size="small" type="primary">提交</el-button>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>
<script>
import Header from '@/pages/header'

export default {
  name: 'login',
  components: {
    Header
  },
  data() {
    return {
      home_style: '',
      show_acti: 1,
      drawer: false,
      // 新增
      new_task: {
        parent_task: '',
        new_name: '',
        department: [],
        presetTime: '',
        task_type: '',
        demand: ''
      },
      radio1: '1',
      radio2: '2',
      dynamicTags: ['标签一', '标签二', '标签三', '标签四'],
      inputVisible: false,
      inputValue: '',
      add_list: '',
      checkList: []
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
    change_show(e, url) {
      this.show_acti = e
      // this.$router.push({ path: '/home/components/' + url })
      if (this.$route.path == '/home/components/' + url) {
        return ''
      } else {
        this.$router.push({ path: '/home/components/' + url })
      }
    },
    // 项目详情页面显示
    beClose(e) {
      console.log(e)
      this.show_acti = 6
    },
    // 添加标签
    showInput() {
      let list = this.dynamicTags
      let add_list = this.add_list
      let cf = true
      if (add_list) {
        for (let i = 0; i < list.length; i++) {
          const element = list[i]
          if (element == add_list) {
            console.log('请勿重复添加')
            cf = false
          }
        }
        if (cf) {
          list.push(add_list)
          this.add_list = ''
        }
      }
    },

    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    getMsgFormSon(data) {
      this.drawer = data
    },
    router_url(){
      let url = this.$route.path
      let url1 = '/home/components/statistics'
      let url2 = '/home/components/project'
      let url2_ = '/home/components/project_details'
      let url3 = '/home/components/task'
      let url4 = '/home/components/document'
      let url5 = '/home/components/set'
      if(url == url1){
        this.show_acti = 1
      }else if (url == url2) {
        this.show_acti = 2
      }else if (url == url2_) {
        this.show_acti = 2
      }else if (url == url3) {
        this.show_acti = 3
      }else if (url == url4) {
        this.show_acti = 4
      }else if (url == url5) {
        this.show_acti = 5
      }
    }
  },
  // 钩子函数
  mounted() {
    this.widthheight()
    sessionStorage.setItem('refresh', 0)
    this.router_url()
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
  font-family: 'SourceHanSansSC';
  font-size: 16px;
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
.el-aside .title:hover {
  background: #fff;
}
.el-aside .title.act {
  background: #fff;
}
.el-aside .title i {
  width: 24px;
  font-size: 18px;
  margin-right: 5px;
}
.el-main {
  min-width: 1200px;
}
.home .add_box {
  height: 100%;
  box-sizing: border-box;
  padding: 36px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-between;
}
.home .add_box>.title:nth-of-type(1){
  text-align: center;
  font-weight: 600;
  font-size: 18px;
}
.home .add_box .title {
  text-align: right;
  box-sizing: border-box;
  padding-right: 18px;
}
.home .add_box .presetTime>div{
  width: 100%;
}
.home .add_box .batton {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.home .add_box .batton button {
  width: 36%;
}
.home .add_box .know_pop span {
  margin-left: 0;
  margin-right: 9px;
}
.home >>> .el-drawer__body {
  height: 100%;
}
.home >>> .el-scrollbar {
  height: 100%;
}
.home >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.home >>> .el-main .cell{
  text-align: left;
}
</style>

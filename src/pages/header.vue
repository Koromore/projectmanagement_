<template>
  <div class="topheader">
    <el-row>
      <el-header style="height: 75px;">
        <img src="static/images/hander/logo.png" height="72" class="logo" alt srcset />
        <div :span="3" class="header-right">
          <div class="add_du" @click="drawer = true">
            <img src="static/images/hander/add_du.png" width="32" alt srcset />
            创建
          </div>
          <el-col :span="8">
            <el-badge :value="3" class="item">
              <img src="static/images/hander/news.png" alt srcset />
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
          </el-col>
          <!-- 头像 -->
          <el-avatar
            size="large"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          ></el-avatar>
        </div>
      </el-header>
    </el-row>
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
        <el-col :span="13">
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
        <!-- <el-col :span="24">
          <el-col :span="6" class="title title2">执行部门</el-col>
          <el-col :span="18" :offset="6">
            <el-checkbox-group v-model="new_task.department">
              <el-checkbox label="复选框 A"></el-checkbox>
              <el-checkbox label="复选框 B"></el-checkbox>
              <el-checkbox label="复选框 C"></el-checkbox>
              <el-checkbox label="复选框 D"></el-checkbox>
              <el-checkbox label="复选框 E"></el-checkbox>
              <el-checkbox label="复选框 F"></el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-col>-->
        <el-col :span="16" :offset="3">
          <el-input placeholder="请输入内容" v-model="new_task.parent_task" clearable></el-input>
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

        <el-col :span="13" :offset="3">
          <el-input placeholder="请输入内容" v-model="add_list" clearable></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="showInput">添加</el-button>
        </el-col>
        <el-col :span="12" :offset="6" class="batton">
          <el-button type="info">取消</el-button>
          <el-button type="primary">提交</el-button>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: 'topheader',
  data() {
    return {
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
      add_list: ''
    }
  },
  methods: {
    logout() {
      //退出登录
      // this.$store.commit('logout');
      // this.$router.push({ path: '/logout' })
    },
    // 标签编辑
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
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
    }
  }
}
</script>
<style >
.topheader {
  padding-bottom: 75px;
  /* height: 0px; */
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
  width: 240px;
  float: right;
  color: #555555;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.header-right .add_du {
  width: 100px;
  color: white;
  font-size: 16px;
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
  height: 72px;
}
.el-badge__content {
  border: 0;
}

.topheader .add_box {
  height: 100%;
  box-sizing: border-box;
  padding: 36px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-between;
}
.topheader .add_box .title {
  text-align: center;
}
/* .topheader .add_box .new_name {
  height: 40px;
  line-height: 40px;
} */
.topheader .add_box .batton {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.topheader .add_box .batton button {
  width: 128px;
}
.topheader .add_box .know_pop span{
  margin-left: 0;
  margin-right: 9px;
}
.topheader >>> .el-drawer__body {
  height: 100%;
}
.topheader >>> .el-scrollbar {
  height: 100%;
}
.topheader >>> .el-scrollbar__wrap {
  overflow-x: hidden;
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
</style>

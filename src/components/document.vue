<template>
  <div class="task" :style="project_style">
    <el-row>
      <el-col :span="24" class="top">
        <el-col :span="4" class>
          客户
          <el-select v-model="client" placeholder="请选择">
            <el-option
              v-for="item in client_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6" class="tab tab1">
          <el-col :span="8" @click.native="tab1_change(1)" :class="[tab1_act=='1' ? 'act' : '']">官网</el-col>
          <el-col :span="8" @click.native="tab1_change(2)" :class="[tab1_act=='2' ? 'act' : '']">口碑</el-col>
          <el-col
            :span="8"
            @click.native="tab1_change(3)"
            :class="[tab1_act=='3' ? 'act' : '']"
          >数字营销</el-col>
        </el-col>
        <el-col :span="4" class="tab tab2">
          <el-col :span="12" @click.native="tab2_change(1)" :class="[tab2_act=='1' ? 'act' : '']">专项</el-col>
          <el-col :span="12" @click.native="tab2_change(2)" :class="[tab2_act=='2' ? 'act' : '']">日常</el-col>
        </el-col>
        <el-col :span="8" class="tab tab3">
          <el-input placeholder="搜索" suffix-icon="el-icon-search" v-model="input1"></el-input>
        </el-col>
      </el-col>
      <!--  -->
      <!-- 我发起 -->
      <el-col :span="24" class="table table1" v-if="table_show">
        <el-col :span="24" class="title">
          <el-col :span="3">文档</el-col>
          <el-col :span="3">客户</el-col>
          <el-col :span="3">
            项目
            <i class="el-icon-caret-bottom"></i>
          </el-col>
          <el-col :span="3">
            任务
            <i class="el-icon-caret-bottom"></i>
          </el-col>
          <!-- <el-col :span="3">父任务</el-col> -->
          <el-col :span="3">
            更新时间
            <img src="/static/images/project/down.png" width="24" alt srcset />
          </el-col>
          <el-col :span="3">更新人</el-col>
        </el-col>
        <el-col :span="24" class="list" v-for="item in tableData" :key="item.index">
          <el-col :span="3">{{item.name}}</el-col>
          <el-col :span="3">{{item.department}}</el-col>
          <el-col :span="3">{{item.task}}</el-col>
          <el-col :span="3">{{item.last_task}}</el-col>
          <el-col :span="3">{{item.presetTime}}</el-col>
          <el-col :span="3">{{item.operation}}</el-col>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'document',
  data() {
    return {
      loginState: true, // 避免多次点击
      project_style: '',
      input1: '',
      // 客户列表
      client_list: [
        {
          value: '广汽本田',
          label: '广汽本田'
        },
        {
          value: '吉利',
          label: '吉利'
        },
        {
          value: '沃尔沃',
          label: '沃尔沃'
        }
      ],
      // 客户列表选择结果
      client: '广汽本田',
      // 1审核中 2执行中 3已完成 4延期
      tableData: [
        {
          name: '皓影赠礼',
          department: '网络营销',
          task: '产品原型',
          state: 1,
          state_text: '审核中',
          last_task: '策划方案',
          presetTime: '20-01-21',
          operation: '操作'
        },
        {
          name: '皓影赠礼',
          department: '网络营销',
          task: '产品原型',
          state: 2,
          state_text: '执行中',
          last_task: '策划方案',
          presetTime: '20-01-21',
          operation: '操作'
        },
        {
          name: '皓影赠礼',
          department: '网络营销',
          task: '产品原型',
          state: 4,
          state_text: '延期',
          last_task: '策划方案',
          presetTime: '20-01-21',
          operation: '操作'
        },
        {
          name: '皓影赠礼',
          department: '网络营销',
          task: '产品原型',
          state: 4,
          state_text: '延期',
          last_task: '策划方案',
          presetTime: '20-01-21',
          operation: '操作'
        },
        {
          name: '皓影赠礼',
          department: '网络营销',
          task: '产品原型',
          state: 4,
          state_text: '延期',
          last_task: '策划方案',
          presetTime: '20-01-21',
          operation: '操作'
        }
      ],
      tabs_activity: 1,
      table_show: true,
      // 项目类型1选择
      tab1_act: 1,
      // 项目类型2选择
      tab2_act: 1
    }
  },
  // 方法
  methods: {
    // 获取浏览器宽高
    widthheight() {
      let winWidth = window.innerWidth
      let winHeight = window.innerHeight
      let height = winHeight - 75
      // this.project_style = 'height:' + height + 'px;'
    },
    // 
    tab1_change(e){
      // console.log(e)
      if (e == 1) {
        this.tab1_act = 1
      }else if(e == 2){
        this.tab1_act = 2
      }else if(e == 3){
        this.tab1_act = 3
      }
    },
    // 
    tab2_change(e){
      // console.log(e)
      if (e == 1) {
        this.tab2_act = 1
      }else if(e == 2){
        this.tab2_act = 2
      }
    }
  },
  // 钩子函数
  mounted() {
    this.widthheight()
    // this.getlocalStorage()
  }
}
</script>
<style scoped>
/* .project {
  background: red;
} */
.task .top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.task .top .tab {
  height: 26px;
  text-align: center;
  background-color: rgb(247, 247, 247);
  border-radius: 5px;
  border: 1px solid #bbb;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.task .top .tab div {
  height: 26px;
  line-height: 26px;
  font-size: 12px;
  box-sizing: border-box;
  cursor: pointer;
}
.task .top .tab1 div,
.task .top .tab2 div {
  border-left: 1px solid #bbb;
}
.task .top .tab1 div:hover,
.task .top .tab2 div:hover {
  background: rgb(16, 142, 233);
  color: white;
}
.task .top .tab1 div:nth-of-type(1),
.task .top .tab2 div:nth-of-type(1) {
  border: none;
}
.task .top .tab div.act {
  background: rgb(16, 142, 233);
  color: white;
}
.task .top .tab3 {
  height: 72px;
  border: none;
  color: white;
}
.el-button + .el-button {
  margin: 0;
}
.task .tabs {
  font-weight: 700;
  font-size: 20px;
  box-sizing: border-box;
  padding: 13px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.task .tabs div {
  height: 36px;
  line-height: 36px;
  color: rgba(164, 167, 170, 1);
  box-sizing: border-box;
  padding-bottom: 13px;
  cursor: pointer;
}
.task .tabs div:nth-of-type(2) {
  margin-left: 32px;
}
.task .tabs .act {
  border-bottom: 2px solid black;
  color: black;
}
.task .table .title,
.task .table .list {
  width: 100%;
  height: 48px;
  font-size: 14px;
  box-sizing: border-box;
  padding-left: 36px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.task .table .title {
  font-weight: bold;
  background: rgb(236, 235, 235);
}
.task .table .title div {
  height: 48px;
  line-height: 48px;
}
.task .table .list {
  border-bottom: 1px solid rgb(187, 187, 187);
}
.state_color1 {
  color: rgb(236, 185, 21);
}
.state_color2 {
  color: rgb(1, 176, 114);
}
.state_color3 {
  color: rgb(172, 171, 171);
}
.state_color4 {
  color: rgb(255, 0, 0);
}
</style>

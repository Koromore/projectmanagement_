<template>
  <div class="task" :style="project_style">
    <el-row>
      <el-col :span="24" class="top">
        <el-col :span="6" class>
          <el-col :span="4" class="title">客户</el-col>
          <el-col :span="20">
            <el-select v-model="client" placeholder="请选择" size="small">
              <el-option
                v-for="item in client_list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="4" class="tab tab1">
          <el-button-group>
            <el-button
              type="primary"
              plain
              size="small"
              @click="tab1_change(1)"
              :class="[tab1_act=='1' ? 'act' : '']"
            >&nbsp;&nbsp;&nbsp;&nbsp;官网&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            <el-button
              type="primary"
              plain
              size="small"
              @click="tab1_change(2)"
              :class="[tab1_act=='2' ? 'act' : '']"
            >&nbsp;&nbsp;&nbsp;&nbsp;口碑&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            <el-button
              type="primary"
              plain
              size="small"
              @click="tab1_change(3)"
              :class="[tab1_act=='3' ? 'act' : '']"
              style="border-left: 0;"
            >数字营销</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="4" class="tab tab2">
          <el-button-group>
            <el-button
              type="primary"
              plain
              size="small"
              @click="tab2_change(1)"
              :class="[tab2_act=='1' ? 'act' : '']"
            >&nbsp;&nbsp;&nbsp;&nbsp;专项&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            <el-button
              type="primary"
              plain
              size="small"
              @click="tab2_change(2)"
              :class="[tab2_act=='2' ? 'act' : '']"
            >&nbsp;&nbsp;&nbsp;&nbsp;日常&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="8" class="tab tab3">
          <el-button-group>
            <el-button type="primary" size="small">&nbsp;&nbsp;新项目&nbsp;&nbsp;</el-button>
            <el-button type="danger" size="small">&nbsp;&nbsp;&nbsp;&nbsp;延时&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            <el-button type="warning" size="small">&nbsp;&nbsp;审核中&nbsp;&nbsp;</el-button>
            <el-button type="success" size="small">&nbsp;&nbsp;执行中&nbsp;&nbsp;</el-button>
          </el-button-group>
        </el-col>
      </el-col>
      <!--  -->
      <el-col :span="24" class="tabs">
        <div @click="table_tab(1)" :class="[tabs_activity=='1' ? 'act' : '']">我发起</div>
        <div @click="table_tab(2)" :class="[tabs_activity=='2' ? 'act' : '']">我参与</div>
      </el-col>
      <!-- 我发起 -->
      <el-col :span="24" class="table table1" v-if="table_show">
        <el-col :span="24" class="title">
          <el-col :span="3">
            所属项目
            <i class="el-icon-caret-bottom"></i>
          </el-col>
          <el-col :span="3">
            部门
            <i class="el-icon-caret-bottom"></i>
          </el-col>
          <el-col :span="3">任务</el-col>
          <el-col :span="3">
            执行状态
            <i class="el-icon-caret-bottom"></i>
          </el-col>
          <el-col :span="3">父任务</el-col>
          <el-col :span="3">
            预计时间
            <!-- <img src="static/images/project/down.png" width="24" alt srcset /> -->
            <i class="el-icon-sort"></i>
          </el-col>
          <el-col :span="3">操作</el-col>
        </el-col>
        <el-col :span="24" class="list" v-for="item in tableData" :key="item.index">
          <el-col :span="3">{{item.name}}</el-col>
          <el-col :span="3">{{item.department}}</el-col>
          <el-col :span="3">{{item.task}}</el-col>
          <el-col
            :span="3"
            :class="{'state_color1': item.state == 1,
                  'state_color2': item.state == 2,
                  'state_color3': item.state == 3,
                  'state_color4': item.state == 4}"
          >{{item.state_text}}</el-col>
          <el-col :span="3">{{item.last_task}}</el-col>
          <el-col :span="3">{{item.presetTime}}</el-col>
          <el-col :span="3">
            <el-button size="small" type="info" @click="sponsor_feedback(item.id)">反馈</el-button>
            <el-button size="small" type="primary" @click="sponsor_achieve(item.id)">完成</el-button>
          </el-col>
        </el-col>
      </el-col>
      <!-- 我参与 -->
      <el-col :span="24" class="table table2" v-if="!table_show">
        <el-col :span="24" class="title">
          <el-col :span="2">部门</el-col>
          <el-col :span="2">任务</el-col>
          <el-col :span="2">状态</el-col>
          <el-col :span="2">执行人</el-col>
          <el-col :span="2">
            预计时间
            <!-- <img src="static/images/project/down.png" width="24" alt srcset /> -->
            <i class="el-icon-sort"></i>
          </el-col>
          <el-col :span="2">
            完成时间
            <!-- <img src="static/images/project/down.png" width="24" alt srcset /> -->
            <i class="el-icon-sort"></i>
          </el-col>
          <el-col :span="2">下达人</el-col>
          <el-col :span="2">成果</el-col>
          <el-col :span="2">操作</el-col>
        </el-col>
        <el-col :span="24" class="list" v-for="item in tableData2" :key="item.index">
          <el-col :span="2">{{item.department}}</el-col>
          <el-col :span="2">{{item.task}}</el-col>
          <el-col
            :span="2"
            :class="{'state_color1': item.state == 1,
                  'state_color2': item.state == 2,
                  'state_color3': item.state == 3,
                  'state_color4': item.state == 4}"
          >{{item.state_text}}</el-col>
          <el-col :span="2">{{item.carryPeople}}</el-col>
          <el-col :span="2">{{item.presetTime}}</el-col>
          <el-col :span="2">{{item.finishTime}}</el-col>
          <el-col :span="2">{{item.assignPeople}}</el-col>
          <el-col :span="2">{{item.result}}</el-col>
          <el-col :span="2">
            <el-button size="small" type="primary" @click="join_achieve(item.id)">完成</el-button>
          </el-col>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'task',
  data() {
    return {
      loginState: true, // 避免多次点击
      project_style: '',
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
          id: 1,
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
          id: 2,
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
          id: 3,
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
          id: 4,
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
          id: 5,
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
      tableData2: [
        {
          id: 1,
          department: '内容',
          task: '赠礼活动',
          state: 4,
          state_text: '延期',
          color: 'color:red;',
          carryPeople: '张三',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '张三',
          result: '成果',
          operation: '操作'
        },
        {
          id: 2,
          department: '设计',
          task: '网站设计稿',
          state: 1,
          state_text: '审核中',
          color: 'color:red;',
          carryPeople: '张三',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '张三',
          result: '成果',
          operation: '操作'
        },
        {
          id: 3,
          department: '研发',
          task: '后台开发',
          state: 4,
          state_text: '延期',
          color: 'color:red;',
          carryPeople: '张三',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '张三',
          result: '成果',
          operation: '操作'
        },
        {
          id: 4,
          department: '策划',
          task: '策划方案',
          state: 4,
          state_text: '延期',
          color: 'color:red;',
          carryPeople: '张三',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '张三',
          result: '成果',
          operation: '操作'
        },
        {
          id: 5,
          department: '网络营销',
          task: '产品原型',
          state: 4,
          state_text: '延期',
          color: 'color:red;',
          carryPeople: '张三',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '张三',
          result: '成果',
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
    // 选项卡
    table_tab(e) {
      if (e == 1) {
        ;(this.tabs_activity = 1), (this.table_show = true)
      } else if (e == 2) {
        ;(this.tabs_activity = 2), (this.table_show = false)
      }
    },
    //
    tab1_change(e) {
      // console.log(e)
      if (e == 1) {
        this.tab1_act = 1
      } else if (e == 2) {
        this.tab1_act = 2
      } else if (e == 3) {
        this.tab1_act = 3
      }
    },
    //
    tab2_change(e) {
      // console.log(e)
      if (e == 1) {
        this.tab2_act = 1
      } else if (e == 2) {
        this.tab2_act = 2
      }
    },
    sponsor_feedback(e) {
      console.log('我发起反馈' + e)
    },
    sponsor_achieve(e) {
      console.log('我发起完成' + e)
    },
    join_achieve(e) {
      console.log('我参与完成' + e)
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
  height: 36px;
  line-height: 36px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.task .top .title {
  height: 36px;
  line-height: 36px;
  text-align: center;
}
/* .task .top .tab {
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
.task .top .tab3{
  border: none;
  color: white
}
.task .top .tab3 div:nth-of-type(1){
  background: rgb(16, 142, 233);
}
.task .top .tab3 div:nth-of-type(2){
  background: rgb(255, 0, 0);
}
.task .top .tab3 div:nth-of-type(3){
  background: rgb(245, 185, 106);
}
.task .top .tab3 div:nth-of-type(4){
  background: rgb(77, 159, 103);
} */

.task .top .tab1 .el-button--primary.is-plain {
  border-color: #ddd;
}
.task .top .tab2 .el-button--primary.is-plain {
  border-color: #ddd;
}
.task .top .tab1 >>> .el-button,
.task .top .tab2 >>> .el-button {
  background: #fff;
  color: black;
}
.task .top .tab1 >>> .el-button:hover,
.task .top .tab2 >>> .el-button:hover {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.task .top .tab1 >>> .el-button.act,
.task .top .tab2 >>> .el-button.act {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
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
  height: 32px;
  line-height: 32px;
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
.task .table .list:hover {
  background: #f7f7f7;
}
.task .table .title {
  font-weight: bold;
  background: rgb(236, 235, 235);
}
.task .table .title .el-icon-sort {
  font-size: 18px;
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

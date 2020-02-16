<template>
  <div class="project" :style="project_style">
    <el-row>
      <el-col :span="24" class="top">
        <!-- <div class="grid-content bg-purple-dark"> -->
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
          <!-- <el-col :span="6">新项目</el-col>
          <el-col :span="6">延时</el-col>
          <el-col :span="6">审核中</el-col>
          <el-col :span="6">执行中</el-col>-->
          <el-button-group>
            <el-button type="primary" size="small">&nbsp;&nbsp;新项目&nbsp;&nbsp;</el-button>
            <el-button type="danger" size="small">&nbsp;&nbsp;&nbsp;&nbsp;延时&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            <el-button type="warning" size="small">&nbsp;&nbsp;审核中&nbsp;&nbsp;</el-button>
            <el-button type="success" size="small">&nbsp;&nbsp;执行中&nbsp;&nbsp;</el-button>
          </el-button-group>
        </el-col>
        <!-- </div> -->
      </el-col>
      <el-col :span="24" class="tabs">
        <div @click="table_tab(1)" :class="[tabs_activity=='1' ? 'act' : '']">我发起</div>
        <div @click="table_tab(2)" :class="[tabs_activity=='2' ? 'act' : '']">我参与</div>
      </el-col>
      <!-- 我发起 -->
      <el-col :span="24" class="table table1" v-show="table_show">
        <el-table
          ref="filterTable"
          :data="tableData1"
          style="width: 100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
          :row-style="{height: '57px'}"
        >
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="state_text" label="状态">
            <div
              slot-scope="scope"
              class="cell"
              :class="{'state_color1': scope.row.state == 1,
                  'state_color2': scope.row.state == 2,
                  'state_color3': scope.row.state == 3,
                  'state_color4': scope.row.state == 4}"
            >{{scope.row.state_text}}</div>
          </el-table-column>
          <el-table-column prop="num" label="总任务数/待完成"></el-table-column>
          <el-table-column prop="presetTime" label="预计时间">
            <template slot="header">
              预计时间
              <i class="el-icon-sort"></i>
            </template>
          </el-table-column>
          <el-table-column prop="finishTime" label="完成时间">
            <template slot="header">
              完成时间
              <i class="el-icon-sort"></i>
            </template>
          </el-table-column>
          <el-table-column prop="assignPeople" label="下达人"></el-table-column>
          <el-table-column prop="tag" label="操作" width="180" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-button
                size="small"
                v-if="scope.row.state == 1"
                type="info"
                @click="feedback(scope.row.id)"
              >反馈</el-button>
              <el-button
                size="small"
                v-if="scope.row.state == 1"
                type="primary"
                @click="achieve(scope.row.id)"
              >完成</el-button>
              <el-button
                size="small"
                v-if="scope.row.state == 2 || scope.row.state == 4"
                type="info"
                @click="redact(scope.row.id)"
              >编辑</el-button>
              <el-button
                size="small"
                v-if="scope.row.state == 2|| scope.row.state == 4"
                type="info"
                @click="expurgate(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!-- 我参与 -->
      <el-col :span="24" class="table table2" v-show="!table_show">
        <el-table
          ref="filterTable"
          :data="tableData2"
          style="width: 100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
          :row-style="{height: '57px'}"
          @cell-click="project_details"
        >
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="state_text" label="状态">
            <div
              slot-scope="scope"
              class="cell"
              :class="{'state_color1': scope.row.state == 1,
                  'state_color2': scope.row.state == 2,
                  'state_color3': scope.row.state == 3,
                  'state_color4': scope.row.state == 4}"
            >{{scope.row.state_text}}</div>
          </el-table-column>
          <el-table-column prop="presetTime" label="预计时间">
            <template slot="header">
              预计时间
              <i class="el-icon-sort"></i>
            </template>
          </el-table-column>
          <el-table-column prop="finishTime" label="完成时间">
            <template slot="header">
              完成时间
              <i class="el-icon-sort"></i>
            </template>
          </el-table-column>
          <el-table-column prop="assignPeople" label="下达人" filter-placement="bottom-end"></el-table-column>
        </el-table>
      </el-col>
      <!-- 抽屉 -->
      <el-drawer title="任务" :visible.sync="drawer2" :with-header="false">
        <el-row class="feedback">
          <el-col :span="24">
            <el-col :span="6" class="title">反馈</el-col>
            <el-col :span="24">
              <el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="result">反馈反馈反馈反馈反馈</el-input>
            </el-col>
          </el-col>
          <el-col :span="14" :offset="5" class="batton">
            <el-button size="small" type="info">取消</el-button>
            <el-button size="small" type="primary">提交</el-button>
          </el-col>
        </el-row>
      </el-drawer>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'project',
  data() {
    return {
      drawer2: false,
      // plain: false,
      autofocus: true,
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
      tableData1: [
        {
          id: 1,
          name: '皓影赠礼',
          state: 4,
          state_text: '延期',
          color: 'color:red;',
          num: '10/4',
          presetTime: '20-01-21',
          finishTime: '',
          assignPeople: '张三'
        },
        {
          id: 2,
          name: '皓影赠礼',
          state: 1,
          state_text: '审核中',
          color: 'color:red;',
          num: '10/4',
          presetTime: '20-01-21',
          finishTime: '',
          assignPeople: '张三'
        },
        {
          id: 3,
          name: '皓影赠礼',
          state: 2,
          state_text: '执行中',
          num: '10/4',
          presetTime: '20-01-21',
          finishTime: '',
          assignPeople: '张三'
        },
        {
          id: 4,
          name: '皓影赠礼',
          state: 3,
          state_text: '已完成',
          num: '10/4',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '张三'
        },
        {
          id: 5,
          name: '皓影赠礼',
          state: 3,
          state_text: '已完成',
          num: '10/4',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '张三'
        }
      ],
      tableData2: [
        {
          id: 1,
          name: '皓影赠礼',
          state: 4,
          state_text: '延期',
          color: 'color:red;',
          presetTime: '20-01-21',
          finishTime: '',
          assignPeople: '张三'
        },
        {
          id: 2,
          name: '皓影赠礼',
          state: 1,
          state_text: '审核中',
          color: 'color:red;',
          presetTime: '20-01-21',
          finishTime: '',
          assignPeople: '张三'
        },
        {
          id: 3,
          name: '皓影赠礼',
          state: 2,
          state_text: '执行中',
          presetTime: '20-01-21',
          finishTime: '',
          assignPeople: '张三'
        },
        {
          id: 4,
          name: '皓影赠礼',
          state: 3,
          state_text: '已完成',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '张三'
        },
        {
          id: 5,
          name: '皓影赠礼',
          state: 3,
          state_text: '已完成',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '张三'
        }
      ],
      // 我参与 我发起选项卡
      tabs_activity: 1,
      table_show: true,
      // 项目类型1选择
      tab1_act: 1,
      // 项目类型2选择
      tab2_act: 1,
      // 反馈内容
      result: ''
    }
  },
  // 方法
  methods: {
    // del(){
    //   this.$delete(this.data,"plain", val)
    // },
    // 获取浏览器宽高
    widthheight() {
      let winWidth = window.innerWidth
      let winHeight = window.innerHeight
      let height = winHeight - 75
      // this.project_style = 'height:' + height + 'px;'
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
    // 选项卡
    table_tab(e) {
      if (e == 1) {
        ;(this.tabs_activity = 1), (this.table_show = true)
      } else if (e == 2) {
        ;(this.tabs_activity = 2), (this.table_show = false)
      }
    },
    // 项目详情
    feedback(e) {
      console.log('反馈' + e)
      this.drawer2 = true
    },
    redact(e) {
      console.log('编辑' + e)
    },
    achieve(e) {
      console.log('完成' + e)
    },
    expurgate(e) {
      console.log('删除' + e)
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    },
    formatter(row, column) {
      return row.address
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    // 表格点击事件项目详情
    project_details(row, column, event, cell) {
      // console.log(row)
      // console.log(column)
      // console.log(event)
      // console.log(cell)
      if (column.property == 'name') {
        // console.log("123")
        this.$router.push({ path: '/home/components/project_details', query: { id: row.id }})
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
.project .top {
  height: 36px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.project .top .title {
  height: 32px;
  line-height: 32px;
  text-align: center;
}
.project .top .tab1 .el-button--primary.is-plain {
  border-color: #ddd;
}
.project .top .tab2 .el-button--primary.is-plain {
  border-color: #ddd;
}
.project .top .tab1 >>> .el-button,
.project .top .tab2 >>> .el-button {
  background: #fff;
  color: black;
}
.project .top .tab1 >>> .el-button:hover,
.project .top .tab2 >>> .el-button:hover {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.project .top .tab1 >>> .el-button.act,
.project .top .tab2 >>> .el-button.act {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.project .top .tab1 div:nth-of-type(1),
.project .top .tab2 div:nth-of-type(1) {
  border: none;
}
.project .top .tab div.act {
  color: white;
}
.project .top .tab3 {
  border: none;
  color: white;
}
.el-button + .el-button {
  margin: 0;
}
.project .tabs {
  font-weight: 700;
  font-size: 20px;
  box-sizing: border-box;
  padding: 13px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.project .tabs div {
  height: 32px;
  line-height: 32px;
  color: rgba(164, 167, 170, 1);
  box-sizing: border-box;
  padding-bottom: 13px;
  cursor: pointer;
}
.project .tabs div:nth-of-type(2) {
  margin-left: 32px;
}
.project .tabs .act {
  border-bottom: 2px solid black;
  color: black;
}
.project .table .title,
.project .table .list {
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
.project .table .list:hover {
  background: #f7f7f7;
}
.project .table .title {
  font-weight: bold;
  background: rgb(236, 235, 235);
}
.project .table .title .el-icon-sort {
  font-size: 18px;
}
.project .table .title div {
  height: 48px;
  line-height: 48px;
}
.project .table .list {
  border-bottom: 1px solid rgb(187, 187, 187);
}
.project .table .list div:nth-of-type(1) {
  cursor: pointer;
}
.project .table .list div {
  height: 48px;
  line-height: 48px;
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
.project .batton {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.project .batton button {
  width: 36%;
}
.feedback {
  height: 100%;
  padding: 36px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  align-content: space-between;
}
.feedback .title{
  font-size: 18px;
  margin-bottom: 13px;
}
</style>

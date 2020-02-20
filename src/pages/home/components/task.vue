<template>
  <div class="task" :style="project_style">
    <el-row>
      <el-col :span="24" class="top">
        <el-col :span="5" class>
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
        <el-col :span="6" class="tab tab1">
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
            <el-tooltip class="item" effect="dark" content="新任务" placement="bottom">
              <el-button type="primary" size="small">&nbsp;&nbsp;1&nbsp;&nbsp;</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="延时" placement="bottom">
              <el-button
                type="danger"
                size="small"
              >&nbsp;&nbsp;&nbsp;&nbsp;2&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="审核中" placement="bottom">
              <el-button type="warning" size="small">&nbsp;&nbsp;3&nbsp;&nbsp;</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="执行中" placement="bottom">
              <el-button type="success" size="small">&nbsp;&nbsp;4&nbsp;&nbsp;</el-button>
            </el-tooltip>
          </el-button-group>
        </el-col>
      </el-col>
      <!--  -->
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
          :row-style="{'height': '57px','text_aling':'left'}"
        >
          <el-table-column
            prop="name"
            label="所属项目"
            column-key="name"
            :filters="[{text: '皓影赠礼', value: '皓影赠礼'}, {text: '广本网站优化', value: '广本网站优化'}]"
            :filter-method="filterName"
          ></el-table-column>
          <el-table-column
            prop="department"
            label="部门"
            :filters="[{text: '网络营销', value: '网络营销'}, {text: '设计', value: '设计'}, {text: '研发', value: '研发'}, {text: '策划', value: '策划'}, {text: '内容', value: '内容'}]"
            :filter-method="filterDepartment"
          ></el-table-column>
          <el-table-column prop="task" label="任务"></el-table-column>
          <el-table-column prop="state_text" label="执行状态">
            <div
              slot-scope="scope"
              class="cell"
              :class="{'state_color1': scope.row.state == 1,
                  'state_color2': scope.row.state == 2,
                  'state_color3': scope.row.state == 3,
                  'state_color4': scope.row.state == 4}"
            >{{scope.row.state_text}}</div>
          </el-table-column>
          <el-table-column prop="last_task" label="父任务"></el-table-column>
          <el-table-column prop="presetTime" label="预计时间">
            <template slot="header">
              预计时间
              <i class="el-icon-sort"></i>
            </template>
          </el-table-column>
          <el-table-column prop="tag" label="操作" width="180" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="info"
                @click="sponsor_feedback(scope.row.id,scope.row.task)"
                v-if="scope.row.state != 3"
              >反馈</el-button>
              <el-popconfirm title="确认执行此操作吗？" @onConfirm="sponsor_achieve(scope.row.id,scope.row.task,scope.row.state)">
                <el-button
                  size="small"
                  type="primary"
                  slot="reference"
                  v-if="scope.row.state == 1"
                >完成</el-button>
              </el-popconfirm>
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
          :row-style="{'height': '57px'}"
          align="left"
        >
          <el-table-column prop="department" label="部门"></el-table-column>
          <el-table-column prop="task" label="任务">
            <el-link slot-scope="scope" @click="task_detail(scope.row.id)">{{scope.row.task}}</el-link>
          </el-table-column>
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
          <el-table-column prop="carryPeople" label="执行人" width="164">
            <template slot-scope="scope">
              <div v-show="change_carryPeople_show != scope.$index">
                {{scope.row.carryPeople}}
                <el-link
                  type="primary"
                  @click="change_carryPeople(scope.$index)"
                  v-show="scope.row.state == 2 || scope.row.state == 4"
                >更换</el-link>
              </div>
              <div v-show="change_carryPeople_show == scope.$index">
                <el-input
                  placeholder="请输入内容"
                  v-model="tableData2[scope.$index].carryPeople"
                  class="input-with-select"
                  size="small "
                >
                  <el-button slot="append" type="primary" @click="change_carryPeople('true')">确认</el-button>
                </el-input>
              </div>
            </template>
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
          <el-table-column prop="assignPeople" label="下达人"></el-table-column>
          <el-table-column prop="result" label="成果">
            <div class="result" slot-scope="scope" v-if="scope.row.state == 3">
              <img src="static/images/document/ppt.png" width="24" alt srcset />
              <div>策划方案</div>
            </div>
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="180" filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-popconfirm title="确认执行此操作吗？" @onConfirm="join_redact(scope.row.id)">
                <el-button size="small" v-if="scope.row.state == 4 " type="info" slot="reference">忽略</el-button>
              </el-popconfirm>
              <el-button
                size="small"
                v-if="scope.row.state == 2"
                type="info"
                slot="reference"
                @click="join_feedback(scope.row.id,scope.row.task)"
              >反馈</el-button>
              <el-popconfirm title="确认执行此操作吗？" @onConfirm="join_achieve(scope.row.id,scope.row.task,scope.row.state)">
                <el-button
                  size="small"
                  v-if="scope.row.state == 2 || scope.row.state == 4"
                  type="primary"
                  slot="reference"
                >完成</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!-- 抽屉 -->
      <el-drawer title="任务" :visible.sync="drawer1" :with-header="false">
        <el-row class="task_details">
          <el-col :span="6" class="title">执行部门：</el-col>
          <el-col :span="18">设计部</el-col>
          <el-col :span="6" class="title">任务类型：</el-col>
          <el-col :span="18">网站设计</el-col>
          <el-col :span="6" class="title">执行人：</el-col>
          <el-col :span="18">张三</el-col>
          <el-col :span="6" class="title">状态：</el-col>
          <el-col :span="18">
            <el-select
              v-model="state_value"
              placeholder="请选择"
              size="small"
              :class="{'state_color1': state_value == 1,
                  'state_color2': state_value == 2,
                  'state_color3': state_value == 3,
                  'state_color4': state_value == 4}"
            >
              <el-option
                v-for="item in state_list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6" class="title">预计时间：</el-col>
          <el-col :span="18">20-01-21</el-col>
          <el-col :span="6" class="title">完成时间：</el-col>
          <el-col :span="18">20-01-21</el-col>
          <el-col :span="6" class="title">需求：</el-col>
          <el-col :span="18">PC网站设计，客户需求商务简约风，以皓影为主题，突出产品的价值定位及车型特点。</el-col>
          <el-col :span="6" class="title">附件：</el-col>
          <el-col :span="18">
            <div class="smname">
              <img src="static/images/document/ppt.png" width="24" alt srcset />
              <br />参考资料
            </div>
          </el-col>
          <el-divider content-position="right"></el-divider>
          <el-col :span="6" class="title">完成结果：</el-col>
          <el-col :span="18">
            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="result">完成结果：描述</el-input>
          </el-col>
          <el-col :span="6" class="title">附件：</el-col>
          <el-col :span="18">
            <div class="smname">
              <img src="static/images/document/ppt.png" width="24" alt srcset />
              <br />最终成果
            </div>
          </el-col>
          <el-divider content-position="right"></el-divider>
          <el-col :span="6" class="title">反馈意见：</el-col>
          <el-col :span="18" class="suggest">
            <el-scrollbar>
              <el-col :span="24" class="suggest_list">
                <el-col :span="12" class="time">2020-01-12 12:00</el-col>
                <el-col :span="12" class="pop">客户部-黄振宇</el-col>
                <el-col :span="24" class="content">请将色调调整为红色。</el-col>
              </el-col>
              <el-col :span="24" class="suggest_list">
                <el-col :span="12" class="time">2020-01-10 10:00</el-col>
                <el-col :span="12" class="pop">内容部-张三</el-col>
                <el-col :span="24" class="content">调整意见文本内容。</el-col>
              </el-col>
              <el-col :span="24" class="suggest_list">
                <el-col :span="12" class="time">2020-01-10 10:00</el-col>
                <el-col :span="12" class="pop">内容部-张三</el-col>
                <el-col :span="24" class="content">调整意见文本内容。</el-col>
              </el-col>
            </el-scrollbar>
          </el-col>
          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info">取消</el-button>
            <el-button size="small" type="primary">提交</el-button>
          </el-col>
        </el-row>
      </el-drawer>
      <!-- 抽屉 -->
      <el-drawer title="任务" :visible.sync="drawer2" :with-header="false">
        <el-row class="feedback">
          <el-col :span="24">
            <el-col :span="24" class="title">{{drawer2_task}}</el-col>
            <el-col :span="6" class="title">反馈</el-col>
            <el-col :span="24">
              <el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="result">反馈反馈反馈反馈反馈</el-input>
            </el-col>
          </el-col>
          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info">取消</el-button>
            <el-button size="small" type="primary">提交</el-button>
          </el-col>
        </el-row>
      </el-drawer>
      <!-- 抽屉 -->
      <el-drawer title="任务" :visible.sync="drawer3" :with-header="false">
        <el-row class="feedback">
          <el-col :span="24">
            <el-col :span="24" class="title">{{drawer3_task}}</el-col>
            <el-col :span="6" class="title">延期原因</el-col>
            <el-col :span="24">
              <el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="result"></el-input>
            </el-col>
          </el-col>
          <el-col :span="12" :offset="7" class="batton">
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
  name: 'task',
  data() {
    return {
      // 抽屉控制
      drawer1: false,
      drawer2: false,
      drawer3: false,
      drawer2_task: '',
      drawer3_task: '',
      change_carryPeople_show: 'true',
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
          name: '广本网站优化',
          department: '设计',
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
          department: '研发',
          task: '产品原型',
          state: 4,
          state_text: '延期',
          last_task: '策划方案',
          presetTime: '20-01-21',
          operation: '操作'
        },
        {
          id: 4,
          name: '广本网站优化',
          department: '策划',
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
          department: '内容',
          task: '产品原型',
          state: 3,
          state_text: '已完成',
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
          carryPeople: '张三1',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '张三1',
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
          carryPeople: '张三2',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '张三2',
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
          carryPeople: '张三3',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '张三3',
          result: '成果',
          operation: '操作'
        },
        {
          id: 4,
          department: '策划',
          task: '策划方案',
          state: 2,
          state_text: '执行中',
          color: 'color:red;',
          carryPeople: '张三4',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '张三4',
          result: '成果',
          operation: '操作'
        },
        {
          id: 5,
          department: '网络营销',
          task: '产品原型',
          state: 3,
          state_text: '已完成',
          color: 'color:red;',
          carryPeople: '张三5',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '张三5',
          result: '成果',
          operation: '操作'
        }
      ],
      result: '',
      tabs_activity: 1,
      table_show: true,
      // 项目类型1选择
      tab1_act: 1,
      // 项目类型2选择
      tab2_act: 1,
      // 项目状态选择
      state_list: [
        {
          value: '1',
          label: '审核中'
        },
        {
          value: '2',
          label: '执行中'
        },
        {
          value: '3',
          label: '已完成'
        },
        {
          value: '4',
          label: '延期'
        }
      ],
      state_value: '1'
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
    sponsor_feedback(e,task) {
      console.log('我发起反馈' + e)
      this.drawer2 = true
      this.drawer2_task = task
    },
    sponsor_achieve(e,task,state) {
      console.log('我发起完成' + e)
      if (state == 4) {
        this.drawer3 = true
        this.drawer3_task = task
      }
    },
    join_redact(e) {
      console.log('我参与忽略' + e)
    },
    join_feedback(e,task) {
      console.log('我参与反馈' + e)
      this.drawer2 = true
      this.drawer2_task = task
    },
    join_achieve(e,task,state) {
      console.log('我参与完成' + e)
      if (state == 4) {
        this.drawer3 = true
        this.drawer3_task = task
      }
    },
    // 筛选所属项目
    filterName(value, row) {
      return row.name === value
    },
    filterDepartment(value, row) {
      return row.department === value
    },
    task_detail() {
      this.drawer1 = true
    },
    change_carryPeople(e) {
      this.change_carryPeople_show = e
    }
    // 点击单元格
    // task_details(row, column, cell, event) {
    //   // console.log(row)
    //   console.log(column)
    //   // console.log(cell)
    //   // console.log(event)
    //   if (column.property == 'task') {
    //     this.drawer1 = true
    //   }
    // },
    // 提示框
    // pop_up() {
    //   const h = this.$createElement
    //   this.$msgbox({
    //     title: '操作提示',
    //     message: '确认执行此操作吗？',
    //     showCancelButton: true,
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     beforeClose: (action, instance, done) => {
    //       if (action === 'confirm') {
    //         instance.confirmButtonLoading = true
    //         instance.confirmButtonText = '执行中...'
    //         setTimeout(() => {
    //           done()
    //           setTimeout(() => {
    //             instance.confirmButtonLoading = false
    //           }, 300)
    //         }, 1500)
    //       } else {
    //         done()
    //       }
    //     }
    //   }).then(action => {
    //     this.$message({
    //       type: 'info',
    //       message: '操作成功'
    //     })
    //   })
    // }
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
.task .top .tab3 >>> .el-button {
  width: 80px;
}
.el-button + .el-button {
  margin: 0;
}
.task .tabs {
  font-weight: 700;
  font-size: 16px;
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
.state_color1 >>> input {
  color: rgb(236, 185, 21);
}
.state_color2 >>> input {
  color: rgb(1, 176, 114);
}
.state_color3 >>> input {
  color: rgb(172, 171, 171);
}
.state_color4 >>> input {
  color: rgb(255, 0, 0);
}
.task .task_details {
  height: 100%;
  padding: 36px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: space-between;
  align-items: flex-start;
}
.task .task_details .title{
  text-align: right;
  box-sizing: border-box;
  padding-right: 18px;
}
.task .task_details .smname {
  width: 72px;
  text-align: center;
  font-size: 13px;
  color: rgb(162, 162, 162);
}
.task .task_details .suggest {
  height: 108px;
}
.task .task_details .suggest .suggest_list {
  height: 48px;
  margin-bottom: 12px;
}
.task .task_details .suggest .suggest_list .pop,
.task .task_details .suggest .suggest_list .time {
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  color: rgb(162, 162, 162);
}
.task .task_details .suggest .suggest_list .pop {
  text-align: right;
}
.task .task_details .suggest .suggest_list .content {
  color: #000;
  font-size: 16px;
}
.task .task_details >>> .el-select input {
  width: 81px;
  border: none;
  font-size: 16px;
  padding-left: 0;
}
.task >>> .el-drawer__body {
  height: 100%;
}
.task >>> .el-scrollbar {
  height: 100%;
}
.task >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.task .batton {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.task .batton button {
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
.feedback .title:nth-of-type(1) {
  font-weight: 600;
  text-align: center;
}
.feedback .title {
  font-size: 18px;
  margin-bottom: 13px;
}
</style>

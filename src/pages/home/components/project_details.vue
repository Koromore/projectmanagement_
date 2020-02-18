<template>
  <div class="project_details" :style="project_style">
    <el-row>
      <el-col :span="24" class="top">
        <el-col :span="4" class>
          项目管理 /
          <span class="project_name">皓影赠礼</span>
        </el-col>
      </el-col>
      <el-col :span="3" class="tabs">
        <el-col
          :span="12"
          @click.native="table_tab(1)"
          :class="[tabs_activity=='1' ? 'act' : '']"
        >执行情况</el-col>
        <el-col
          :span="12"
          @click.native="table_tab(2)"
          :class="[tabs_activity=='2' ? 'act' : '']"
        >项目需求</el-col>
      </el-col>
      <el-col :span="4" :offset="16" class="detail_list">
        <el-col :span="24" v-show="!sousuo_show">
          <img @click="drawer1 = true" src="static/images/project_detail/add.png" alt srcset />
          <img @click="gantt(1)" src="static/images/project_detail/gantt.png" alt srcset />
          <img @click="drawer2 = true" src="static/images/project_detail/history.png" alt srcset />
          <img @click="sousuoShow" src="static/images/project_detail/sousuo.png" alt srcset />
        </el-col>
        <el-col :span="24" class="sousuo" v-show="sousuo_show">
          <el-col :span="20">
            <el-input placeholder="请输入内容" v-model="sousuo_input" size="small">
              <i slot="suffix" class="el-input__icon el-icon-search" @click="sousuo"></i>
            </el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <i class="el-icon-circle-close" @click="sousuoShow"></i>
          </el-col>
        </el-col>
      </el-col>
      <!-- 抽屉 -->
      <el-drawer title="添加任务" :visible.sync="drawer1" :with-header="false">
        <el-row class="add_box">
          <el-col :span="6" class="title title1">父任务</el-col>
          <el-col :span="13">
            <el-input placeholder="请输入内容" v-model="new_task.parent_task" clearable></el-input>
          </el-col>
          <el-col :span="24">
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
          </el-col>

          <el-col :span="6" class="title title1">名称</el-col>
          <el-col :span="13">
            <el-input placeholder="请输入内容" v-model="new_task.new_name" clearable></el-input>
          </el-col>
          <el-col :span="6" class="title title1">预计时间</el-col>
          <el-col :span="13">
            <el-date-picker v-model="new_task.presetTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>
          <el-col :span="6" class="title title1">任务类型</el-col>
          <el-col :span="13">
            <el-input placeholder="请输入内容" v-model="new_task.task_type" clearable></el-input>
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
          <!-- </el-col> -->

          <el-col :span="14" :offset="5" class="batton">
            <el-button size="small" type="info">取消</el-button>
            <el-button size="small" type="primary">提交</el-button>
          </el-col>
        </el-row>
      </el-drawer>
      <el-drawer title="历史记录" :visible.sync="drawer2" :with-header="false">
        <el-row class="records">
          <el-col :span="23" :offset="1" class="title">历史记录</el-col>
          <el-col :span="23" :offset="1" class="records_list" :style="style1">
            <el-scrollbar>
              <el-timeline>
                <el-timeline-item
                  v-for="item in records_list"
                  :key="item.index"
                  :timestamp="item.time"
                  placement="top"
                >
                  <el-card class="content">
                    <p>完成成果：{{item.result}}</p>
                    <p>更新人：{{item.people}}</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </el-scrollbar>
          </el-col>
        </el-row>
      </el-drawer>
      <el-col :span="24" class="table table1" v-if="table_show">
        <el-table
          ref="filterTable"
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
          :row-style="{height: '57px'}"
        >
          <el-table-column prop="department" label="部门"></el-table-column>
          <el-table-column prop="task" label="任务"></el-table-column>
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
          <el-table-column prop="carryPeople" label="执行人"></el-table-column>
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
              <img src="static/images/document/pt.png" width="32" alt srcset />
              <div>策划方案</div>
            </div>
          </el-table-column>
          <el-table-column prop="操作" label="操作" filter-placement="bottom-end" width="136">
            <template slot-scope="scope">
              <el-popconfirm title="确认执行此操作吗？" @onConfirm="redact(scope.row.id)">
                <el-button size="small" v-if="scope.row.state == 4 " type="info" slot="reference">忽略</el-button>
              </el-popconfirm>
              <el-button
                size="small"
                v-if="scope.row.state == 1"
                type="info"
                @click="feedback(scope.row.id)"
              >反馈</el-button>
              <el-popconfirm title="确认执行此操作吗？" @onConfirm="achieve(scope.row.id)">
                <el-button
                  size="small"
                  v-if="scope.row.state != 3"
                  type="primary"
                  slot="reference"
                >完成</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!--  -->
      <el-col :span="24" class="table table2" v-if="!table_show">
        <el-col :span="6" class="title">
          <el-col :span="24">项目名称</el-col>
          <el-col :span="24">皓影赠礼</el-col>
        </el-col>
        <el-col :span="6" class="title">
          <el-col :span="24">预计时间</el-col>
          <el-col :span="24">2020.1.1-2020.3.1</el-col>
        </el-col>
        <el-col :span="6" class="title">
          <el-col :span="24">项目类别</el-col>
          <el-col :span="24">广汽本田 - 社区 - 专项</el-col>
        </el-col>
        <el-col :span="24" class="need">
          <el-col :span="24" class="span">需求</el-col>
          <el-col :span="24" class>
            需求背景
            <br />1.广本飞度社区运营，长期无法达到客户期望;
            <br />2.由销售部长直接提出，进行飞度社区增粉、提升认证车主数量为核心指标的专项方案策划。
            <br />
            <br />
          </el-col>
          <el-col :span="24" class>
            方案结构
            <br />1.平台现状分析(事实数据，反应注册人数、认证人数)
            <br />2.指出运营现状的问题(根据事实数据，指出问题)
            <br />3.行业环境及趋势或优秀案例及效果(大家-般怎么做)
            <br />4.提出我们的解决施策(我们怎么做)
            <br />5.效果量化(说明整体KPI，明确阶段KPI)
            <br />6.创意实施(具体创意细化)
            <br />7.预算及KPI
            <br />
            <br />
          </el-col>
          <el-col :span="24" class>
            其他补充
            <br />1.重点创意必须联系设计制作创意DEMO
            <br />2.客户重点提及各地车友会的资源利用，创意构思时要重点考虑。
            <br />3.网易云音乐需明确合作资源
            <br />4.竞争情报:三选一，对手为XXXXXX
            <br />
            <br />
          </el-col>
          <el-col :span="24" class="span">附件</el-col>
        </el-col>
      </el-col>
      <!-- 抽屉 -->
      <el-drawer title="任务" :visible.sync="drawer3" :with-header="false">
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
  name: 'project_details',
  data() {
    return {
      loginState: true, // 避免多次点击
      project_style: '',
      drawer1: false,
      drawer2: false,
      drawer3: false,
      sousuo_show: true,
      sousuo_input: '',// 所搜框内容
      // 1审核中 2执行中 3已完成 4延期
      tableData: [
        {
          id: 1,
          department: '内容',
          task: '赠礼活动',
          state: 4,
          state_text: '延期',
          color: 'color:red;',
          carryPeople: '解雨臣',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '解雨臣',
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
          carryPeople: '解雨臣',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '解雨臣',
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
          carryPeople: '解雨臣',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '解雨臣',
          result: '成果',
          operation: '操作'
        },
        {
          id: 4,
          department: '策划',
          task: '策划方案',
          state: 3,
          state_text: '已完成',
          color: 'color:red;',
          carryPeople: '解雨臣',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '解雨臣',
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
          carryPeople: '解雨臣',
          presetTime: '20-01-21',
          finishTime: '20-02-22',
          assignPeople: '解雨臣',
          result: '成果',
          operation: '操作'
        }
      ],
      // 我参与 我发起选项卡
      tabs_activity: 1,
      table_show: true,
      // 新增
      new_task: {
        parent_task: '',
        new_name: '',
        department: [],
        presetTime: '',
        task_type: '',
        demand: ''
      },
      records_list: [
        {
          time: '2018/4/2 20:46',
          result: '完成',
          people: '解雨臣',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        },
        {
          time: '2018/4/2 20:46',
          result: '完成',
          people: '解雨臣',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        },
        {
          time: '2018/4/2 20:46',
          result: '完成',
          people: '解雨臣',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        },
        {
          time: '2018/4/2 20:46',
          result: '完成',
          people: '解雨臣',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        },
        {
          time: '2018/4/2 20:46',
          result: '完成',
          people: '解雨臣',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        }
      ],
      style1: '',
      // 反馈信息
      result: ''
    }
  },
  // 方法
  methods: {
    // 获取浏览器宽高
    widthheight() {
      let winWidth = window.innerWidth
      let winHeight = window.innerHeight
      let height1 = winHeight - 100
      this.style1 = 'height:' + height1 + 'px;'
    },
    // 选项卡
    table_tab(e) {
      if (e == 1) {
        ;(this.tabs_activity = 1), (this.table_show = true)
      } else if (e == 2) {
        ;(this.tabs_activity = 2), (this.table_show = false)
      }
    },
    redact(e) {
      console.log('忽略' + e)
      // this.pop_up()
    },
    feedback(e) {
      console.log('反馈' + e)
      this.drawer3 = true
    },
    achieve(e) {
      console.log('完成' + e)
      // this.pop_up()
    },
    gantt(e) {
      this.$router.push({ path: '/gantti', query: { id: 2 } })
    },
    sousuoShow(e) {
      this.sousuo_show = !this.sousuo_show
      // console.log(e)
    },
    sousuo(){
      console.log(this.sousuo_input)
    }
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
  }
}
</script>
<style scoped>
/* .project {
  background: red;
} */
.project_details .top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.project_details .top {
  font-size: 13px;
}
.project_details .top .project_name {
  font-weight: 700;
}
.project_details .top .tab {
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
.project_details .detail_list > div {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
}
.project_details .detail_list img {
  width: 24px;
}
.project_details .detail_list .sousuo {
  display: flex;
  align-items: center;
}
.project_details .detail_list .sousuo i{
  font-size: 21px;
}
.el-button + .el-button {
  margin: 0;
}
.project_details .tabs {
  height: 26px;
  margin-bottom: 13px;
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
.project_details .tabs div {
  height: 26px;
  line-height: 26px;
  font-size: 12px;
  box-sizing: border-box;
  cursor: pointer;
}
.project_details .tabs div:nth-of-type(2) {
  border-left: 1px solid #bbb;
}
.project_details .tabs div:hover {
  background: rgb(16, 142, 233);
  color: white;
}
.project_details .tabs .act {
  background: rgb(16, 142, 233);
  color: white;
}
.project_details .table1 .title,
.project_details .table1 .list {
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
.project_details .table1 .list:hover {
  background: #f7f7f7;
}
.project_details .table1 .title {
  font-weight: bold;
  background: rgb(236, 235, 235);
}
.project_details .table1 .title .el-icon-sort {
  font-size: 18px;
}
.project_details .table1 .title div {
  height: 48px;
  line-height: 48px;
}
.project_details .table1 .list {
  border-bottom: 1px solid rgb(187, 187, 187);
}
.project_details .table1 .list div:nth-of-type(1) {
  cursor: pointer;
}
.project_details .table1 .list div {
  height: 48px;
  line-height: 48px;
}
.project_details .table1 .result{
  font-size: 13px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-start;
}
.project_details .table2 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.project_details .table2 .title {
  height: 100px;
  box-sizing: border-box;
  padding: 13px;
  border: 1px solid rgb(187, 187, 187);
  border-radius: 4px;
  font-weight: 400;
  font-size: 20px;
  color: rgb(16, 16, 16);
  line-height: 29px;
}

.project_details .table2 .title div:nth-of-type(2) {
  font-weight: 400;
  font-size: 16px;
  color: rgb(96, 94, 94);
  line-height: 24px;
}
.project_details .table2 .need {
  margin-top: 36px;
  font-weight: 400;
  font-size: 16px;
  color: rgb(96, 94, 94);
  line-height: 28px;
}
.project_details .table2 .need .span {
  font-weight: 400;
  font-size: 20px;
  color: rgb(16, 16, 16);
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
.project_details .add_box {
  height: 100%;
  box-sizing: border-box;
  padding: 36px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-between;
}
.project_details .add_box .title {
  text-align: center;
}
/* .project_details .add_box .new_name {
  height: 40px;
  line-height: 40px;
} */
.project_details .add_box .batton {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.project_details .add_box .batton button {
  width: 36%;
}
.project_details >>> .el-drawer__body {
  height: 100%;
}
.project_details >>> .el-scrollbar {
  height: 100%;
}
.project_details >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.project_details .records_box {
  height: 100%;
}
.project_details .records {
  height: 100%;
}
.project_details .records .title {
  font-weight: bold;
  height: 100px;
  line-height: 100px;
}
.project_details .records .el-card {
  font-size: 16px;
}
.project_details .records .el-card:hover {
  background: #eee;
}
.project_details .batton {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.project_details .batton button {
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
.feedback .title {
  font-size: 18px;
  margin-bottom: 13px;
}
</style>

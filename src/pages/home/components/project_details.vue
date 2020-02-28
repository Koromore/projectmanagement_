<template>
  <div class="project_details" :style="project_style">
    <el-row>
      <el-col :span="24" class="top">
        <el-col :span="4" class>
          项目管理 /
          <span class="project_name">皓影赠礼</span>
        </el-col>
      </el-col>
      <el-col :span="6" class="tabs">
        <el-button-group>
          <el-button
            type="primary"
            plain
            size="small"
            @click="table_tab(1)"
            :class="[tabs_activity=='1' ? 'act' : '']"
          >执行情况</el-button>
          <el-button
            type="primary"
            plain
            size="small"
            @click="table_tab(2)"
            :class="[tabs_activity=='2' ? 'act' : '']"
          >项目需求</el-button>
        </el-button-group>
      </el-col>
      <el-col :span="4" :offset="13" class="detail_list">
        <el-col :span="24" v-show="!sousuo_show">
          <i @click="drawer1 = true" class="el-icon-circle-plus-outline"></i>
          <i @click="gantt(1)" class="el-icon-tickets"></i>
          <i @click="drawer2 = true" class="el-icon-time"></i>
          <i @click="sousuoShow" class="el-icon-search"></i>
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
        <el-scrollbar style="height: 100%">
        <el-row class="add_box">
          <el-col :span="24">
            <el-col :span="6" class="title title1">创建任务</el-col>
          </el-col>
          <el-col :span="6" class="title">父任务</el-col>
          <el-col :span="13">
            <el-input placeholder="请输入内容" v-model="new_task.parent_task" clearable></el-input>
          </el-col>
          <el-col :span="24">
            <el-col :span="6" class="title title2">执行部门</el-col>
            <el-col :span="15" :offset="6" class="department">
              <el-radio v-model="new_task.department" label="1">武汉策划</el-radio>
              <el-radio v-model="new_task.department" label="2">上海研发</el-radio>
              <el-radio v-model="new_task.department" label="3">上海项目</el-radio>
              <el-radio v-model="new_task.department" label="4">武汉内容</el-radio>
              <el-radio v-model="new_task.department" label="5">北京网络销售</el-radio>
            </el-col>
          </el-col>

          <el-col :span="6" class="title">名称</el-col>
          <el-col :span="13">
            <el-input placeholder="请输入内容" v-model="new_task.new_name" clearable></el-input>
          </el-col>
          <el-col :span="6" class="title">预计时间</el-col>
          <el-col :span="13" class="presetTime">
            <el-date-picker v-model="new_task.presetTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-col>
          <el-col :span="6" class="title">任务类型</el-col>
          <el-col :span="13" class="task_type">
            <el-select v-model="task_type_value" placeholder="请选择任务类型">
              <el-option
                v-for="item in task_type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6" class="title">需求</el-col>
          <el-col :span="13">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 8}"
              placeholder="请输入内容"
              v-model="new_task.demand"
            ></el-input>
          </el-col>
          <!-- 上传 -->
          <el-col :span="13" :offset="6" class="upload">
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" class="upload_list">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
            <div class="text">附件</div>
          </el-col>

          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info">取消</el-button>
            <el-button size="small" type="primary">提交</el-button>
          </el-col>
        </el-row>
        </el-scrollbar>
      </el-drawer>
      <!-- 抽屉 -->
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
                    <p>变动内容：{{item.result}}</p>
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
          <el-table-column prop="task" label="任务">
            <template slot-scope="scope">
              <el-link @click="task_detail(scope.row.id)">{{scope.row.task}}</el-link>
            </template>
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
              <img src="static/images/document/ppt.png" width="24" alt srcset />
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
                @click="feedback(scope.row.id,scope.row.task)"
              >反馈</el-button>
              <el-popconfirm
                title="确认执行此操作吗？"
                @onConfirm="achieve(scope.row.id,scope.row.task,scope.row.state)"
              >
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
        <el-col :span="7" class="title">
          <el-col :span="24">项目名称</el-col>
          <el-col :span="24">皓影赠礼</el-col>
        </el-col>
        <el-col :span="7" class="title">
          <el-col :span="24">预计时间</el-col>
          <el-col :span="24">2020.1.1-2020.3.1</el-col>
        </el-col>
        <el-col :span="7" class="title">
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
            <el-col :span="24" class="title">{{drawer3_task}}</el-col>
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
      <!-- 抽屉 -->
      <el-drawer title="任务" :visible.sync="drawer4" :with-header="false">
        <el-row class="feedback">
          <el-col :span="24">
            <el-col :span="24" class="title">{{drawer4_task}}</el-col>
            <el-col :span="6" class="title">延期原因</el-col>
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
      <el-drawer title="任务" :visible.sync="drawer5" :with-header="false">
        <el-scrollbar style="height: 100%">
          <el-row class="task_details">
            <el-col :span="6" class="title">执行部门：</el-col>
            <el-col :span="18">设计部</el-col>
            <el-col :span="6" class="title">任务类型：</el-col>
            <el-col :span="18">网站设计</el-col>
            <el-col :span="6" class="title">执行人：</el-col>
            <el-col :span="18">张三</el-col>
            <el-col :span="6" class="title">状态：</el-col>
            <el-col :span="18" class="state_color2">执行中</el-col>
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
              <el-scrollbar style="height: 100%;">
                <el-col :span="23" class="suggest_list" v-for="item in suggest_list" :key="item.index">
                  <el-col :span="12" class="time">{{item.time}}</el-col>
                  <el-col :span="12" class="pop">{{item.pop}}</el-col>
                  <el-col :span="24" class="content">{{item.content}}</el-col>
                </el-col>
              </el-scrollbar>
            </el-col>
          </el-row>
        </el-scrollbar>
        <el-row class="batton_pa">
          <el-col :span="12" :offset="7" class="batton">
            <el-button size="small" type="info">取消</el-button>
            <el-button size="small" type="primary">完成</el-button>
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
      drawer4: false,
      drawer5: false,
      drawer3_task: '',
      drawer4_task: '',
      sousuo_show: false,
      sousuo_input: '', // 所搜框内容
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
          time: '20/04/02 20:46',
          result: '前端开发时间变动',
          people: '解雨臣',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        },
        {
          time: '20/04/02 20:46',
          result: '策划方案预计完成时间改动',
          people: '解雨臣',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        },
        {
          time: '20/04/02 20:46',
          result: '策划方案添加预计完成时间',
          people: '解雨臣',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        },
        {
          time: '20/04/02 20:46',
          result: '策划方案已审核',
          people: '解雨臣',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        },
        {
          time: '20/04/02 20:46',
          result: '策划方案已提交',
          people: '解雨臣',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        }
      ],
      style1: '',
      // 反馈信息
      result: '',
      // 项目类型选择
      task_type: [
        {
          value: '选项1',
          label: '任务类型2'
        },
        {
          value: '选项2',
          label: '任务类型3'
        },
        {
          value: '选项3',
          label: '任务类型4'
        },
        {
          value: '选项4',
          label: '任务类型5'
        },
        {
          value: '选项5',
          label: '任务类型6'
        }
      ],
      task_type_value: '',
      // 上传附件
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      suggest_list:[
        {
          time: '2020-01-12 12:00',
          pop: '客户部-黄振宇',
          content: '请将色调调整为红色。'
        },
        {
          time: '2020-01-10 10:00',
          pop: '内容部-张三',
          content: '调整意见文本内容。'
        },
        {
          time: '2020-01-12 12:00',
          pop: '客户部-黄振宇',
          content: '请将色调调整为红色。'
        },
        {
          time: '2020-01-10 10:00',
          pop: '内容部-张三',
          content: '调整意见文本内容。'
        }
      ]
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
    feedback(e, task) {
      console.log('反馈' + e)
      this.drawer3 = true
      this.drawer3_task = task
    },
    achieve(e, task, state) {
      console.log('完成' + e)
      if (state == 4) {
        this.drawer4 = true
        this.drawer4_task = task
      }
    },
    gantt(e) {
      this.$router.push({ path: '/gantti', query: { id: 2 } })
    },
    sousuoShow(e) {
      this.sousuo_show = !this.sousuo_show
      // console.log(e)
    },
    sousuo() {
      console.log(this.sousuo_input)
    },
    task_detail() {
      this.drawer5 = true
    },
    // 上传附件
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    // 获取页面传参
    getParams() {
      let id = this.$route.query.id
      console.log(id)
    },
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
    this.getParams()
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
.project_details .detail_list i {
  font-size: 24px;
}
.project_details .detail_list .sousuo {
  display: flex;
  align-items: center;
}
.project_details .detail_list .sousuo i {
  font-size: 21px;
}
.el-button + .el-button {
  margin: 0;
}
.project_details .tabs {
  margin-bottom: 13px;
}
.project_details .tabs .el-button--primary.is-plain {
  border-color: #ddd;
}
.project_details .tabs >>> .el-button {
  background: #fff;
  color: black;
}
.project_details .tabs >>> .el-button:hover {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.project_details .tabs >>> .el-button.act {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.project_details .tabs div:nth-of-type(1) {
  border: none;
}
.project_details .tabs div.act {
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
.project_details .table1 .result {
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
.project_details .add_box {
  height: 100%;
  box-sizing: border-box;
  padding: 36px 0;
  /* display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: space-between; */
}
.project_details .add_box > .el-col {
  margin-bottom: 16px;
}
.project_details .add_box .title1 {
  font-weight: 600;
  font-size: 18px;
}
.project_details .add_box .title {
  text-align: right;
  box-sizing: border-box;
  padding-right: 18px;
}
.project_details .add_box .upload .text {
  width: 146px;
  text-align: center;
  color: rgba(0, 0, 0, 0.65);
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
.project_details .add_box .department .el-radio {
  width: 108px;
  margin-bottom: 9px;
}
.project_details .add_box .presetTime > div {
  width: 100%;
}
.project_details .add_box .task_type > div {
  width: 100%;
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
.project_details .task_details {
  height: 100%;
  padding: 36px 36px 108px 36px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: space-between;
  align-items: flex-start;
}
.project_details .task_details > .el-col {
  margin-bottom: 18px;
}
.project_details .task_details .title {
  text-align: right;
  box-sizing: border-box;
  padding-right: 18px;
}
.project_details .task_details .smname {
  width: 72px;
  text-align: center;
  font-size: 13px;
  color: rgb(162, 162, 162);
}
.project_details .task_details .suggest {
  height: 172px;
}
.project_details .task_details .suggest .suggest_list {
  height: 48px;
  margin-bottom: 12px;
}
.project_details .task_details .suggest .suggest_list .pop,
.project_details .task_details .suggest .suggest_list .time {
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  color: rgb(162, 162, 162);
}
.project_details .task_details .suggest .suggest_list .pop {
  text-align: right;
}
.project_details .task_details .suggest .suggest_list .content {
  color: #000;
  font-size: 16px;
}
.project_details .batton_pa {
  width: 100%;
  padding: 36px;
  background: white;
  position: absolute;
  bottom: 0;
  left: 0;
}
.project_details .task_details >>> .el-select input {
  width: 81px;
  border: none;
  font-size: 16px;
  padding-left: 0;
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
  margin-bottom: 36px;
}
.feedback .title {
  font-size: 18px;
  margin-bottom: 13px;
}
.project_details >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

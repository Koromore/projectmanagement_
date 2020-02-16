<template>
  <div class="document" :style="project_style">
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
          <el-input
            placeholder="搜索"
            suffix-icon="el-icon-search"
            size="small"
            v-model="input1"
            class="sousuo"
          ></el-input>
        </el-col>
      </el-col>
      <!--  -->
      <!-- 我发起 -->
      <el-col :span="24" class="table table1">
        <el-table
          ref="filterTable"
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{background:'rgb(236, 235, 235)',color:'#000'}"
          :row-style="{height: '57px'}"
        >
          <el-table-column prop="file_name" label="文档">
            <template slot-scope="scope">
              <img src="static/images/document/pt.png" width="32" alt srcset />
              {{scope.row.file_name}}
              <span class="operation"><i class="el-icon-edit"></i></span>
            </template>
          </el-table-column>
          <el-table-column prop="client" label="客户"></el-table-column>
          <el-table-column
            prop="project"
            label="项目"
            :filters="[{text: '皓影赠礼1', value: '皓影赠礼1'}, {text: '皓影赠礼2', value: '皓影赠礼2'}, {text: '皓影赠礼3', value: '皓影赠礼3'}, {text: '皓影赠礼4', value: '皓影赠礼4'}, {text: '皓影赠礼5', value: '皓影赠礼5'}, {text: '皓影赠礼6', value: '皓影赠礼6'}]"
            :filter-method="filterProject"
          ></el-table-column>
          <el-table-column prop="task" label="任务"></el-table-column>
          <el-table-column prop="update_time" label="更新时间">
            <template slot="header">
              更新时间
              <i class="el-icon-sort"></i>
            </template>
          </el-table-column>
          <el-table-column prop="update_people" label="更新人">
            <template slot-scope="scope">
              {{scope.row.update_people}}
              <span class="operation">
                <i class="el-icon-upload2"></i>
                <i class="el-icon-download"></i>
                <i class="el-icon-share"></i>
                <i class="el-icon-time"></i>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-drawer title="历史文档" :visible.sync="drawer" :with-header="false">
        <el-row class="records_document">
          <el-col :span="23" :offset="1" class="title">历史</el-col>
          <el-col :span="23" :offset="1" class="records_document_list" :style="style1">
            <el-scrollbar>
              <el-timeline>
                <el-timeline-item
                  v-for="item in records_document_list"
                  :key="item.index"
                  :timestamp="item.time"
                  placement="top"
                >
                  <el-card class="content">
                    <p>完成成果：{{item.result}}</p>
                    <p>更新人：{{item.people}}</p>
                    <br />
                    <br />
                    <div>
                      <img src="static/images/document/pt.png" width="36" alt srcset />
                      <span>{{item.file_name}}</span>
                      <img class="down" src="static/images/document/down.png" width="21" alt srcset />
                    </div>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </el-scrollbar>
          </el-col>
        </el-row>
      </el-drawer>
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
      drawer: false,
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
          file_name: '文档',
          file_format: 'ppt',
          client: '广汽本田',
          project: '皓影赠礼1',
          task: '产品原型',
          update_time: '20-01-21',
          update_people: '张三'
        },
        {
          id: 2,
          file_name: '文档',
          file_format: 'ppt',
          client: '广汽本田',
          project: '皓影赠礼2',
          task: '后台开发',
          update_time: '20-01-21',
          update_people: '张三'
        },
        {
          id: 3,
          file_name: '文档',
          file_format: 'ppt',
          client: '广汽本田',
          project: '皓影赠礼3',
          task: '策划方案',
          update_time: '20-01-21',
          update_people: '张三'
        },
        {
          id: 4,
          file_name: '文档',
          file_format: 'ppt',
          client: '丰田',
          project: '皓影赠礼4',
          task: '内容撰写',
          update_time: '20-01-21',
          update_people: '张三'
        },
        {
          id: 5,
          file_name: '文档',
          file_format: 'ppt',
          client: '丰田',
          project: '皓影赠礼5',
          task: '内容撰写',
          update_time: '20-01-21',
          update_people: '张三'
        },
        {
          id: 6,
          file_name: '文档',
          file_format: 'ppt',
          client: '丰田',
          project: '皓影赠礼6',
          task: '内容撰写',
          update_time: '20-01-21',
          update_people: '张三'
        }
      ],
      records_document_list: [
        {
          time: '2018/4/2 20:46',
          result: '完成',
          people: '张三',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        },
        {
          time: '2018/4/2 20:46',
          result: '完成',
          people: '张三',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        },
        {
          time: '2018/4/2 20:46',
          result: '完成',
          people: '张三',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        },
        {
          time: '2018/4/2 20:46',
          result: '完成',
          people: '张三',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        },
        {
          time: '2018/4/2 20:46',
          result: '完成',
          people: '张三',
          file_name: '文档',
          file_format: 'ppt',
          file_url: ''
        }
      ],
      tabs_activity: 1,
      table_show: true,
      // 项目类型1选择
      tab1_act: 1,
      // 项目类型2选择
      tab2_act: 1,
      style1: ''
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
    // 筛选所属项目
    filterProject(value, row) {
      return row.project === value
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
.document .top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.document .top .title {
  height: 36px;
  line-height: 36px;
  text-align: center;
}
.document .top .tab3 {
  height: 36px;
  border: none;
  color: white;
}
.document .top .tab3 .sousuo {
  width: 320px;
  height: 36px;
  border: none;
  color: white;
}

.document .top .tab1 .el-button--primary.is-plain {
  border-color: #ddd;
}
.document .top .tab2 .el-button--primary.is-plain {
  border-color: #ddd;
}
.document .top .tab1 >>> .el-button,
.document .top .tab2 >>> .el-button {
  background: #fff;
  color: black;
}
.document .top .tab1 >>> .el-button:hover,
.document .top .tab2 >>> .el-button:hover {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.document .top .tab1 >>> .el-button.act,
.document .top .tab2 >>> .el-button.act {
  background: #409eff;
  color: white;
  border: 1px solid #409eff;
}
.el-button + .el-button {
  margin: 0;
}
.document .table{
  margin-top: 24px;
}
.document .table .operation i{
  font-size: 18px;
}
.document .table .el-table__row .operation{
  display: none;
}
.document .table .el-table__row:hover .operation{
  display: inline;
}
.document >>> .el-drawer__body {
  height: 100%;
}
.document >>> .el-scrollbar {
  height: 100%;
}
.document >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.document .records_document_box {
  height: 100%;
}
.document .records_document {
  height: 100%;
}
.document .records_document .title {
  font-weight: bold;
  height: 100px;
  line-height: 100px;
}
.document .records_document .el-card {
  font-size: 16px;
}
.document .records_document .el-card:hover {
  background: #eee;
}
.document .records_document .el-card .down {
  display: none;
}
.document .records_document .el-card:hover .down {
  display: inline-block;
}
</style>

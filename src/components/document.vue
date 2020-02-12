<template>
  <div class="document" :style="project_style">
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
            <img src="static/images/project/down.png" width="24" alt srcset />
          </el-col>
          <el-col :span="5">更新人</el-col>
        </el-col>
        <el-col
          :span="24"
          class="list"
          v-for="item in tableData"
          :key="item.index"
          @click.native="drawer = true"
        >
          <el-col :span="3">
            <img src="static/images/document/pt.png" width="32" alt srcset />
            
            {{item.file_name}}
            <img class="operation" src="static/images/document/change.png" width="18" alt srcset />
          </el-col>
          <el-col :span="3">{{item.client}}</el-col>
          <el-col :span="3">{{item.project}}</el-col>
          <el-col :span="3">{{item.task}}</el-col>
          <el-col :span="3">{{item.update_time}}</el-col>
          <el-col :span="5">
            <span>{{item.update_people}}</span>
            <span class="operation">
              <img src="static/images/document/up.png" alt srcset />
              <img src="static/images/document/down.png" alt srcset />
              <img src="static/images/document/link.png" alt srcset />
              <img src="static/images/document/time.png" alt srcset />
            </span>
          </el-col>
        </el-col>
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
                      <img
                        class="down"
                        src="static/images/document/down.png"
                        width="21"
                        alt
                        srcset
                      />
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
          project: '皓影赠礼',
          task: '产品原型',
          update_time: '20-01-21',
          update_people: '解雨臣'
        },
        {
          id: 2,
          file_name: '文档',
          file_format: 'ppt',
          client: '广汽本田',
          project: '皓影赠礼',
          task: '产品原型',
          update_time: '20-01-21',
          update_people: '解雨臣'
        },
        {
          id: 3,
          file_name: '文档',
          file_format: 'ppt',
          client: '广汽本田',
          project: '皓影赠礼',
          task: '产品原型',
          update_time: '20-01-21',
          update_people: '解雨臣'
        },
        {
          id: 4,
          file_name: '文档',
          file_format: 'ppt',
          client: '广汽本田',
          project: '皓影赠礼',
          task: '产品原型',
          update_time: '20-01-21',
          update_people: '解雨臣'
        },
        {
          id: 5,
          file_name: '文档',
          file_format: 'ppt',
          client: '广汽本田',
          project: '皓影赠礼',
          task: '产品原型',
          update_time: '20-01-21',
          update_people: '解雨臣'
        },
        {
          id: 6,
          file_name: '文档',
          file_format: 'ppt',
          client: '广汽本田',
          project: '皓影赠礼',
          task: '产品原型',
          update_time: '20-01-21',
          update_people: '解雨臣'
        }
      ],
      records_document_list: [
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
.document .top .tab {
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
.document .top .tab div {
  height: 26px;
  line-height: 26px;
  font-size: 12px;
  box-sizing: border-box;
  cursor: pointer;
}
.document .top .tab1 div,
.document .top .tab2 div {
  border-left: 1px solid #bbb;
}
.document .top .tab1 div:hover,
.document .top .tab2 div:hover {
  background: rgb(16, 142, 233);
  color: white;
}
.document .top .tab1 div:nth-of-type(1),
.document .top .tab2 div:nth-of-type(1) {
  border: none;
}
.document .top .tab div.act {
  background: rgb(16, 142, 233);
  color: white;
}
.document .top .tab3 {
  height: 72px;
  border: none;
  color: white;
}
.el-button + .el-button {
  margin: 0;
}
.document .tabs {
  font-weight: 700;
  font-size: 20px;
  box-sizing: border-box;
  padding: 13px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}
.document .tabs div {
  height: 36px;
  line-height: 36px;
  color: rgba(164, 167, 170, 1);
  box-sizing: border-box;
  padding-bottom: 13px;
  cursor: pointer;
}
.document .tabs div:nth-of-type(2) {
  margin-left: 32px;
}
.document .tabs .act {
  border-bottom: 2px solid black;
  color: black;
}
.document .table .title,
.document .table .list {
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
.document .table .list:hover {
  background: #f7f7f7;
}
.document .table .list .operation {
  display: none;
}
.document .table .list:hover .operation {
  display: inline;
}
.document .table .list .operation img {
  width: 18px;
  margin-left: 9px;
}
.document .table .title {
  font-weight: bold;
  background: rgb(236, 235, 235);
}
.document .table .title div {
  height: 48px;
  line-height: 48px;
}
.document .table .list {
  border-bottom: 1px solid rgb(187, 187, 187);
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

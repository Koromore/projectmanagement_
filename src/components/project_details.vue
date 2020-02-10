<template>
  <div class="project_details" :style="project_style">
    <el-row>
      <el-col :span="24" class="top">
        <el-col :span="4" class>
          项目管理 / <span class="project_name">皓影赠礼</span>
        </el-col>
      </el-col>
      <el-col :span="3" class="tabs">
        <el-col :span="12" @click.native="table_tab(1)" :class='[tabs_activity=="1" ? "act" : ""]'>执行情况</el-col>
        <el-col :span="12" @click.native="table_tab(2)" :class='[tabs_activity=="2" ? "act" : ""]'>项目需求</el-col>
      </el-col>
      <el-col :span="24" class="table table1" v-if="table_show">
        <el-col :span="24" class="title">
          <el-col :span="2">部门</el-col>
          <el-col :span="2">任务</el-col>
          <el-col :span="2">状态</el-col>
          <el-col :span="2">执行人</el-col>
          <el-col :span="2">
            预计时间
            <img src="/static/images/project/down.png" width="24" alt srcset />
          </el-col>
          <el-col :span="2">
            完成时间
            <img src="/static/images/project/down.png" width="24" alt srcset />
          </el-col>
          <el-col :span="2">下达人</el-col>
          <el-col :span="2">成果</el-col>
          <el-col :span="2">操作</el-col>
        </el-col>
        <el-col :span="24" class="list" v-for="item in tableData" :key="item.index">
          <el-col :span="2" @click.native="project_details(item.id)">{{item.department}}</el-col>
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
          <el-col :span="2">{{item.operation}}</el-col>
        </el-col>
      </el-col>
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
          <el-col :span="24" class="span">
            需求
          </el-col>
          <el-col :span="24" class="">
            需求背景<br />
            1.广本飞度社区运营，长期无法达到客户期望;<br />
            2.由销售部长直接提出，进行飞度社区增粉、提升认证车主数量为核心指标的专项方案策划。<br /><br />
          </el-col>
          <el-col :span="24" class="">
            方案结构<br />
            1.平台现状分析(事实数据，反应注册人数、认证人数)<br />
            2.指出运营现状的问题(根据事实数据，指出问题)<br />
            3.行业环境及趋势或优秀案例及效果(大家-般怎么做)<br />
            4.提出我们的解决施策(我们怎么做)<br />
            5.效果量化(说明整体KPI，明确阶段KPI)<br />
            6.创意实施(具体创意细化)<br />
            7.预算及KPI<br /><br />
          </el-col>
          <el-col :span="24" class="">
            其他补充<br />
            1.重点创意必须联系设计制作创意DEMO<br />
            2.客户重点提及各地车友会的资源利用，创意构思时要重点考虑。<br />
            3.网易云音乐需明确合作资源<br />
            4.竞争情报:三选一，对手为XXXXXX<br /><br />
          </el-col>
          <el-col :span="24" class="span">
            附件
          </el-col>
        </el-col>
        
      </el-col>
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
          id: 5,
          department: '网络营销',
          task: '产品原型',
          state: 4,
          state_text: '延期',
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
      if(e == 1){
        this.tabs_activity = 1,
        this.table_show = true
      }else if(e == 2){
        this.tabs_activity = 2,
        this.table_show = false
      }
    },
    // 项目详情
    project_details(e) {
      console.log(e)
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
.project_details .top {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.project_details .top{
  font-size: 13px;
}
.project_details .top .project_name{
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
.el-button + .el-button {
  margin: 0;
}
.project_details .tabs {
  height: 26px;
  margin-bottom: 24px;
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
.project_details .tabs div:nth-of-type(2){
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
.project_details .table1 .title {
  font-weight: bold;
  background: rgb(236, 235, 235);
}
.project_details .table1 .title div {
  height: 48px;
  line-height: 48px;
}
.project_details .table1 .list {
  border-bottom: 1px solid rgb(187, 187, 187);
}
.project_details .table1 .list div:nth-of-type(1){
  cursor: pointer;
}
.project_details .table1  .list div{
  height: 48px;
  line-height: 48px;
}
.project_details .table2 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.project_details .table2  .title{
  height: 100px;
  box-sizing: border-box;
  padding: 13px;
  border: 1px solid rgb(187,187,187);
  border-radius: 4px;
  font-weight: 400;
  font-size: 20px;
  color: rgb(16, 16, 16);
  line-height: 29px;
}
.project_details .table2 .title div:nth-of-type(2){
  font-weight: 400;
  font-size: 16px;
  color: rgb(96, 94, 94);
  line-height: 24px;
}
.project_details .table2 .need{
  margin-top: 36px;
  font-weight: 400;
  font-size: 16px;
  color: rgb(96, 94, 94);
  line-height: 28px;
}
.project_details .table2 .need .span{
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
</style>

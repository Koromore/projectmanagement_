<template>
  <div id="gantti">
    <el-row>
      <el-col :span="24">
        <el-col :span="1" :offset="1" @click.native="return_()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            class="svg-icon mb-icon-flip mb-angle-left"
            width="110"
            height="110"
            viewBox="0 -64 1024 1024"
            style="fill: rgb(16, 16, 16);"
          >
            <path
              d="M590.541 569.139l-23.689 24.542-151.040-145.852 150.187-151.142 24.235 24.064-125.781 126.566z"
            />
          </svg>
        </el-col>

        <el-col :span="22" :offset="2" class="title">皓影赠礼</el-col>
        <el-col :span="20" :offset="2" class="gantt_time"></el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import wlGantt from '@/components/gantt.vue'
// import wlGantt from '@/pages/wl-gantt'

export default {
  name: 'gantti',
  components: {
    wlGantt
  },
  data() {
    return {
      data: [],
      taskList: [], // 项目下的任务
      projectShowDetail: {} // 项目详情
    }
  },
  methods: {
    formatData(date) {
      // var date = new Date();
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()

      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      return year + '-' + month + '-' + strDate
    },
    timeChange(row) {
      // console.log(row)
    },
    // 获取页面传参
    getParams() {
      let id = this.$route.query.id
      // console.log(id)
    },
    // 获取页面传参
    getParams(sousuo) {
      let proId = this.$route.query.id
      let type = this.$route.query.type
      // this.proId = proId
      // this.type = type
      // console.log(id)
      if (type == 0) {
        this.getProjectOfTask(proId, sousuo)
      } else if (type == 1) {
        this.getProjectOfUserTask(proId, sousuo)
      }
      this.getProjectShowDetail(proId)
    },
    // 获取项目需求
    getProjectShowDetail(proId) {
      let data = `?proId=${proId}`
      this.$axios
        .post('/pmbs/api/project/showDetail' + data)
        .then(this.getProjectShowDetailSuss)
    },
    // 获取项目需求回调/api/project/projectOfUserTask
    getProjectShowDetailSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        this.projectShowDetail = res.data.data
      }
    },
    // 获取项目详情-我发起
    getProjectOfTask(proId, sousuo) {
      // this.loading = true
      let data = ''
      if (sousuo != undefined) {
        data = `?proId=${proId}&taskName=${sousuo}`
      } else {
        data = `?proId=${proId}`
      }
      this.$axios
        .post('/pmbs/api/project/projectOfTask' + data)
        .then(this.getProjectOfTaskSuss)
    },
    // 获取项目详情-我发起回调
    getProjectOfTaskSuss(res) {
      // console.log(res)
      if (res.status == 200) {
        let taskList = res.data.data
        this.taskList = taskList
        this.gantt()
      }
    },
    // 获取项目详情-我参与
    getProjectOfUserTask(proId, sousuo) {
      let data = ''
      if (sousuo != undefined) {
        data = `?proId=${proId}&taskName=${sousuo}`
      } else {
        data = `?proId=${proId}`
      }
      this.$axios
        .post('/pmbs/api/project/projectOfUserTask' + data)
        .then(this.getProjectOfUserTaskSuss)
    },
    // 获取项目详情-我参与回调
    getProjectOfUserTaskSuss(res) {
      if (res.status == 200) {
        let taskList = res.data.data
        this.taskList = taskList
        this.gantt()
      }
    },
    // 甘特图
    gantt() {
      // console.log("gantt")
      let that = this
      let taskList = this.taskList
      // console.log(taskList)
      let ganttList = []
      
      for (let i = 0; i < taskList.length; i++) {
        let element = taskList[i];
        let ganttListData = {
          gunter_id: i,
          params: {
            title: element.deptName,
            execute_pop: element.doUserName,
            state_text: '',
            state: element.status,
            start_time: element.updateTime,
            end_time: ''
          },
          start_time: new Date(element.updateTime).getTime(),
          end_time: '',
          bg_color: '',
          level: 1
        }
        // that.formatData(new Date(element.updateTime))
        ganttListData.params.start_time = that.formatData(new Date(element.updateTime))
        // for (let i = 0; i < data.length; i++) {
      //   const element = data[i]
      //   if (element.params.state == 1) {
      //     element.bg_color = 'rgb(1, 176, 114)'
      //   } else if (element.params.state == 2) {
      //     element.bg_color = 'rgb(236, 185, 21)'
      //   } else if (element.params.state == 3) {
      //     element.bg_color = 'rgb(172, 171, 171)'
      //   } else if (element.params.state == 4) {
      //     element.bg_color = 'rgb(255, 0, 0)'
      //   }
      // }
        if (element.status == 1) {
          ganttListData.bg_color = 'rgb(1, 176, 114)'
          ganttListData.params.state_text = '执行中'
        }else if (element.status == 2) {
          ganttListData.bg_color = 'rgb(236, 185, 21)'
          ganttListData.params.state_text = '审核中'
        }else if (element.status == 3) {
          ganttListData.bg_color = 'rgb(172, 171, 171)'
          ganttListData.params.state_text = '已完成'
        }else if (element.status == 4) {
          ganttListData.bg_color = 'rgb(255, 0, 0)'
          ganttListData.params.state_text = '延期'
        }else if (element.status == 5) {
          ganttListData.bg_color = 'rgb(172, 171, 171)'
          ganttListData.params.state_text = '延期完成'
        }
        if (element.overTime == null) {
          ganttListData.params.end_time = that.formatData(new Date())
          ganttListData.end_time = new Date().getTime()
        }else{
          ganttListData.params.end_time = that.formatData(new Date(element.overTime))
          ganttListData.end_time = new Date(element.overTime).getTime()
        }
        ganttList.push(ganttListData)
      }
      // console.log(ganttList)
      // 1 执行中 2 审核中 3 已完成 4 延期
      let data = ganttList
      // [
      //   {
      //     gunter_id: 1,
      //     params: {
      //       title: '网络营销',
      //       execute_pop: '张三',
      //       state_text: '延期',
      //       state: 4,
      //       start_time: '2018-12-20',
      //       end_time: '2019-1-3'
      //     },
      //     start_time: new Date('2018-12-20').getTime(),
      //     end_time: new Date('2019-1-3').getTime(),
      //     bg_color: 'rgb(255, 0, 0)',
      //     level: 1
      //   },
      //   {
      //     gunter_id: 2,
      //     params: {
      //       title: '网络营销',
      //       execute_pop: '张三',
      //       state_text: '审核中',
      //       state: 2,
      //       start_time: '2018-12-19',
      //       end_time: '2019-1-3'
      //     },
      //     start_time: new Date('2018-12-19').getTime(),
      //     end_time: new Date('2019-1-3').getTime(),
      //     bg_color: 'rgb(236, 185, 21)',
      //     level: 1
      //   },
      //   {
      //     gunter_id: 3,
      //     params: {
      //       title: '网络营销',
      //       execute_pop: '张三',
      //       state_text: '执行中',
      //       state: 1,
      //       start_time: '2018-12-19',
      //       end_time: '2019-1-3'
      //     },
      //     start_time: new Date('2018-12-19').getTime(),
      //     end_time: new Date('2019-1-3').getTime(),
      //     bg_color: 'rgb(1, 176, 114)',
      //     level: 1
      //   },
      //   {
      //     gunter_id: 4,
      //     params: {
      //       title: '网络营销',
      //       execute_pop: '张三',
      //       state_text: '已完成',
      //       state: 3,
      //       start_time: '2018-12-19',
      //       end_time: '2019-1-3'
      //     },
      //     start_time: new Date('2018-12-19').getTime(),
      //     end_time: new Date('2019-1-3').getTime(),
      //     bg_color: 'rgb(172, 171, 171)',
      //     level: 1
      //   },
      //   {
      //     gunter_id: 5,
      //     params: {
      //       title: '网络营销',
      //       execute_pop: '张三',
      //       state_text: '已完成',
      //       state: 3,
      //       start_time: '2018-12-19',
      //       end_time: '2019-1-3'
      //     },
      //     start_time: new Date('2018-12-19').getTime(),
      //     end_time: new Date('2019-1-3').getTime(),
      //     bg_color: 'rgb(172, 171, 171)',
      //     level: 1
      //   },
      //   {
      //     gunter_id: 6,
      //     params: {
      //       title: '网络营销',
      //       execute_pop: '张三',
      //       state_text: '已完成',
      //       state: 3,
      //       start_time: '2018-12-19',
      //       end_time: '2019-1-3'
      //     },
      //     start_time: new Date('2018-12-19').getTime(),
      //     end_time: new Date('2019-1-3').getTime(),
      //     bg_color: 'rgb(172, 171, 171)',
      //     level: 1
      //   }
      // ]
      
      // console.log(data)
      let th_data = {
        title: {
          value: '部门',
          width: 130,
          showToast: true,
          listen_click: false
        },
        execute_pop: {
          value: '执行人',
          width: 90,
          showToast: true,
          chooseTime: false
          // time_mode: 1
        },
        state_text: {
          value: '状态',
          width: 90,
          showToast: true,
          chooseTime: false
          // time_mode: 2
        }
      }
      let num = (data.length + 1) * 45 + 1
      let height = num + 'px'
      let projectShowDetail = this.projectShowDetail
      let start_time = new Date(projectShowDetail.createTime).getTime()
      let end_time = ''
      if (projectShowDetail.overTime == null) {
        end_time = new Date().getTime()
      } else {
        end_time = new Date(projectShowDetail.overTime).getTime()
      }
      
      this.$gante({
        container: '.gantt_time',
        ganteData: data,
        start_time: start_time,
        end_time: end_time,
        tabe_width: '360px',
        open: true,
        height: height,
        time_mode: 1,
        th_data: th_data,
        onEdit(data) {
          // console.log(data)
        },
        onClick(data) {
          // console.log(data)
        }
      })
      // console.log('gantt')
    },
    // 返回上一页
    return_() {
      this.$router.go(-1)
      sessionStorage.setItem('refresh', 0)
    },
    refresh() {
      // console.log(this.$store.state.refresh)
      // location.reload()
      var refresh = sessionStorage.getItem('refresh')
      if (refresh == 0) {
        location.reload()
        sessionStorage.setItem('refresh', 1)
      }
    }
  },
  created() {
    // let seif = this
    // seif.getParams()
  },
  // 钩子函数 实例挂载之后
  mounted() {
    this.getParams()
    this.gantt()
    this.refresh()
    // console.log(this.$store.state.refresh)
  },
  // 钩子函数 实例更新之后
  updated() {
    // this.gantt()
  }
}
</script>

<style scoped>
#gantti {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px 25px 0;
}
.title {
  text-align: left;
  font-weight: 400;
  font-size: 36px;
  color: rgb(16, 16, 16);
  line-height: 54px;
  margin-bottom: 32px;
}
/* .wl-gantt-demo {
  margin: 40px auto;
  width: 1000px;
} */
</style>
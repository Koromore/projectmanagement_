<template>
  <div class="statistics">
    <el-row>
      <el-col :span="10" class="gantt_box">
        <div id="business" :style="{width: '100%', height: '300px'}"></div>
      </el-col>
      <el-col :span="10" :offset="1" class="gantt_box">
        <div id="project_state" :style="{width: '100%', height: '300px'}"></div>
      </el-col>
      <el-col :span="21" class="gantt_box">
        <div id="client_state" :style="{width: '100%', height: '450px'}"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'statistics',
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      // 统计数据
      statisticsData: {},
      // 业务占比数据
      businessNameData: [],
      businessListData: [],
      // 项目状态数据
      statusNameData: [],
      statusListData: [],
      // listProjectStatusData: [],
      // 客户状态数据
      // listClientData: [],
      clientNameData: [],
      clientStatusData: [],
      // 客户列表
      clientIdListData: []
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
    // 获取统计数据
    getStatisticsData() {
      // console.log("123")
      let userId = this.userId
      let data = `?userId=${userId}`
      this.$axios
        .post('/pmbs/api/statistic/listAjax' + data)
        .then(this.getStatisticsDataSuss)
    },
    // 获取统计数据回调
    getStatisticsDataSuss(res) {
      if (res.status == 200) {
        this.statisticsData = res.data.data
        let statisticsData = res.data.data
        // console.log(statisticsData)
        // 业务占比
        let listBusiness = statisticsData.listBusiness
        let businessNameData = []
        let businessListData = []
        let clientIdListData = this.clientIdListData
        // console.log(clientIdListData)
        for (let i = 0; i < listBusiness.length; i++) {
          let element = listBusiness[i]
          businessNameData.push(element.businessName)
          let clientList = []
          let listProject = element.listProject
          if (listProject == null) {
            listProject = []
          }
          for (let i = 0; i < listProject.length; i++) {
            let element_ = listProject[i]
            clientIdListData.forEach(element1 => {
              // console.log(element_)
              if (element1.value == element_.clientId) {
                clientList.push(element1.label)
              }
            })
          }

          let clientList_ = Array.from(new Set(clientList))
          let data = {
            value: listProject.length,
            name: element.businessName,
            clientList: clientList_
          }
          businessListData.push(data)
          // console.log(data)
        }
        this.businessNameData = businessNameData // 业务名称
        this.businessListData = businessListData // 业务数量和业务包含的客户
        // console.log(this.businessNameData)
        // console.log(this.businessListData)

        // 项目状态
        let listProjectStatus = statisticsData.listProjectStatus
        let statusNameData = []
        let statusListData = []
        // console.log(listProjectStatus)
        for (let i = 0; i < listProjectStatus.length; i++) {
          let element = listProjectStatus[i]
          let data = {}
          data.value = element.proNum
          data.name = element.status
          statusNameData.push(element.status)
          statusListData.push(data)
        }
        this.statusNameData = statusNameData // 状态名称
        this.statusListData = statusListData // 状态下的任务数量
        // console.log(this.statusNameData)
        // console.log(this.statusListData)

        // 客户状态
        let listClient = statisticsData.listClient
        let clientNameData = []
        let clientStatusData = []
        for (let i = 0; i < listClient.length; i++) {
          let element = listClient[i]
          clientNameData.push(element.clientName)
        }
        // console.log(listClient)
        // console.log(clientNameData)
        this.clientNameData = clientNameData // 客户名称
        // console.log(this.clientNameData)
        let clientStatusDataList1 = {
          name: '延期',
          type: 'bar',
          stack: '广告',
          data: [],
          nodeClick: 'link'
        }
        let clientStatusDataList2 = {
          name: '审核中',
          type: 'bar',
          stack: '广告',
          data: [],
          nodeClick: 'link'
        }
        let clientStatusDataList3 = {
          name: '执行中',
          type: 'bar',
          stack: '广告',
          data: [],
          nodeClick: 'link'
        }
        for (let i = 0; i < listClient.length; i++) {
          let element = listClient[i]
          let num = 0
          for (let j = 0; j < element.projectList.length; j++) {
            let element_ = element.projectList[j]
            if (element_.status == 4) {
              num++
            }
          }
          clientStatusDataList1.data.push(num)
        }
        for (let i = 0; i < listClient.length; i++) {
          let element = listClient[i]
          let num = 0
          for (let j = 0; j < element.projectList.length; j++) {
            let element_ = element.projectList[j]
            if (element_.status == 2) {
              num++
            }
          }
          clientStatusDataList2.data.push(num)
        }
        for (let i = 0; i < listClient.length; i++) {
          let element = listClient[i]
          let num = 0
          for (let j = 0; j < element.projectList.length; j++) {
            let element_ = element.projectList[j]
            if (element_.status == 1) {
              num++
            }
          }
          clientStatusDataList3.data.push(num)
        }
        // console.log(clientStatusDataList1)
        // console.log(clientStatusDataList2)
        // console.log(clientStatusDataList3)
        clientStatusData.push(clientStatusDataList1)
        clientStatusData.push(clientStatusDataList2)
        clientStatusData.push(clientStatusDataList3)
        this.clientStatusData = clientStatusData
        // [
        //   {
        //     name: '延期',
        //     type: 'bar',
        //     stack: '客户',
        //     data: [120, 132, 101, 134, 90, 230, 210, 210, 210, 210],
        //     nodeClick: 'link'
        //   },
        //   {
        //     name: '审核中',
        //     type: 'bar',
        //     stack: '广告',
        //     data: [220, 182, 191, 234, 290, 330, 310, 210, 210, 210]
        //   },
        //   {
        //     name: '执行中',
        //     type: 'bar',
        //     stack: '广告',
        //     data: [150, 232, 201, 154, 190, 330, 410, 210, 210, 210]
        //   }
        // ]

        // 甘特图
        this.business_gantt(businessNameData, businessListData)
        this.project_state_gantt()
        this.client_state_gantt()
      }
    },
    // 业务占比甘特图
    business_gantt(name, list) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('business'))
      let businessNameData = this.businessNameData
      let businessListData = this.businessListData
      // console.log(businessNameData)
      // console.log(businessListData)
      // 绘制图表
      myChart.setOption({
        // 标题
        title: {
          text: '业务占比',
          padding: 16
        },
        // 颜色
        color: [
          '#85AFE4',
          '#778CD5',
          '#737ACE',
          '#6F69C6',
          '#B8B3F3',
          '#DDDBF9',
          '#90CFF2',
          '#8BBFE8'
        ],
        tooltip: {
          trigger: 'item',
          position: 'bottom',
          formatter: function(params, ticket, callback) {
            let clientList = ''
            for (let i = 0; i < params.data.clientList.length; i++) {
              let element = params.data.clientList[i]
              clientList += `${element}<br/>`
            }
            let htmlStr = ''
            htmlStr = `
            ${params.name}
            (${params.percent}%)<br/>
            ${clientList}
            `
            return htmlStr
          }
        },
        // 图例
        legend: {
          type: 'scroll',
          icon: 'circle',
          orient: 'horizontal',
          bottom: 10,
          data: businessNameData
          // data: name
        },
        series: [
          {
            name: '业务类型',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: businessListData
            // [
            //   {
            //     value: 335,
            //     name: '口碑',
            //     clientList: ['吉利', '沃尔沃', '长城']
            //   },
            //   {
            //     value: 310,
            //     name: '网站',
            //     clientList: ['吉利', '沃尔沃', '长城']
            //   },
            //   {
            //     value: 234,
            //     name: '数字营销',
            //     clientList: ['吉利', '沃尔沃', '长城']
            //   },
            //   {
            //     value: 135,
            //     name: 'APP',
            //     clientList: ['吉利', '沃尔沃', '长城']
            //   }
            // ]
            // data: list
          }
        ]
      })
    },
    // 项目状态甘特图
    project_state_gantt() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('project_state'))
      let statusNameData = this.statusNameData
      let statusListData = this.statusListData
      // 绘制图表
      myChart.setOption({
        title: { text: '项目状态', padding: 16 },
        color: ['#23D7BB', '#f5b96a', '#C9C9C9', '#FF0000'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}({d}%)'
        },
        legend: {
          // type: 'scroll',
          icon: 'circle',
          orient: 'horizontal',
          // left: 40,
          bottom: 10,
          align: 'auto',
          data: statusNameData //['执行中', '审核中', '延期', '已完成']
        },
        series: [
          {
            name: '项目状态',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: statusListData
            // [
            //   { value: 335, name: '执行中' },
            //   { value: 310, name: '审核中' },
            //   { value: 234, name: '延期' },
            //   { value: 234, name: '已完成' }
            // ]
          }
        ]
      })
    },
    // 客户状态甘特图
    client_state_gantt() {
      let that = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('client_state'))
      let clientNameData = this.clientNameData
      let clientStatusData = this.clientStatusData
      clientStatusData[0].barWidth = 81
      // barWidth: 81
      let percent = 0
      if (clientNameData.length <= 3) {
        percent = 100
      } else if (clientNameData.length > 3) {
        percent = (3 / clientNameData.length) * 100
      }
      // console.log(clientNameData)
      // 绘制图表
      myChart.setOption({
        title: {
          text: '客户状态',
          subtextStyle: {
            align: 'center',
            rich: {
              a: {
                // 没有设置 `align`，则 `align` 为 right
              }
            }
          },
          padding: 16
        },
        color: ['#FF0000', '#F5B96A', '#23D7BB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['延期', '审核中', '执行中'],
          top: 16
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            clientNameData,
            data: clientNameData,
            //  nameRotate: '36deg',
            // nameTextStyle:{
            //   width: '10%',
            //   // rich:{
            //   //   '<style_name>':{
            //   //     color: black
            //   //   }
            //   // }
            // },
            // [
            //   '客户1',
            //   '客户2',
            //   '客户3',
            //   '客户4',
            //   '客户5',
            //   '客户1',
            //   '客户2',
            //   '客户3',
            //   '客户4',
            //   '客户5',
            //   '客户1',
            //   '客户2',
            //   '客户3',
            //   '客户4',
            //   '客户5',
            //   '客户1',
            //   '客户2',
            //   '客户3',
            //   '客户4',
            //   '客户5'
            // ],
            triggerEvent: true, //让x轴可以点击
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              formatter: function(params) {
                var newParamsName = '' // 最终拼接成的字符串
                var paramsNameNumber = params.length // 实际标签的个数
                var provideNumber = 6 // 每行能显示的字的个数
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber) // 换行的话，需要显示几行，向上取整
                /**
                 * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                 */
                // 条件等同于rowNumber>1
                if (paramsNameNumber > provideNumber) {
                  /** 循环每一行,p表示行 */
                  for (var p = 0; p < rowNumber; p++) {
                    var tempStr = '' // 表示每一次截取的字符串
                    var start = p * provideNumber // 开始截取的位置
                    var end = start + provideNumber // 结束截取的位置
                    // 此处特殊处理最后一行的索引值
                    if (p == rowNumber - 1) {
                      // 最后一次不换行
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      // 每一次拼接字符串并换行
                      tempStr = params.substring(start, end) + '\n'
                    }
                    newParamsName += tempStr // 最终拼成的字符串
                  }
                } else {
                  // 将旧标签的值赋给新标签
                  newParamsName = params
                }
                //将最终的字符串返回
                return newParamsName
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],

        dataZoom: [
          {
            show: true,
            realtime: true,
            zoomLock: true,
            start: 0,
            end: percent
          },
          {
            type: 'inside',
            realtime: true,
            zoomOnMouseWheel: false,
            start: 0,
            end: percent
          }
          // ,
          // {
          //   type: 'inside',
          //   yAxisIndex: [0],
          //   start: 0,
          //   end: 36
          // }
        ],
        //clientStatusData
        series: clientStatusData
        // [
        //   {
        //     name: '延期',
        //     type: 'bar',
        //     stack: '广告',
        //     data: [120, 132, 101, 134, 90, 120, 132, 101, 134, 90,120, 132, 101, 134, 90, 120, 132, 101, 134, 90],
        //     nodeClick: 'link',
        //     barWidth: 81
        //   },
        //   {
        //     name: '审核中',
        //     type: 'bar',
        //     stack: '广告',
        //     data: [220, 182, 191, 234, 290, 120, 132, 101, 134, 90,120, 132, 101, 134, 90, 120, 132, 101, 134, 90],
        //     nodeClick: 'link'
        //   },
        //   {
        //     name: '执行中',
        //     type: 'bar',
        //     stack: '广告',
        //     data: [150, 232, 201, 154, 190, 120, 132, 101, 134, 90,120, 132, 101, 134, 90, 120, 132, 101, 134, 90],
        //     nodeClick: 'link'
        //   }
        // ]
      }),
        myChart.on('click', function(params) {
          // console.log(params)
          let name = ''
          if (params.name) {
            name = params.name
          } else if (params.value) {
            name = params.value
          }
          // console.log(name)
          that.$router.push({
            path: '/home/components/project',
            query: { name: name }
          })
        })
    },
    ///////// 获取所有客户信息 start /////////
    getAllClientapiList() {
      this.$axios
        .post('http://pms.guoxinad.com.cn/pas/clientapi/allListAjax')
        .then(this.getAllClientapiListSuss)
    },
    // 获取所有客户信息回调
    getAllClientapiListSuss(res) {
      if (res.status == 200) {
        let data = res.data
        let clientIdList = []
        data.forEach(element => {
          let clientIdListDate = {
            value: element.clientId,
            label: element.clientName
          }
          clientIdList.push(clientIdListDate)
        })
        this.clientIdListData = clientIdList
      }
      // console.log(res)
    }
    ///////// 获取所有客户信息 end /////////
  },
  // 钩子函数
  beforeMount() {
    this.getAllClientapiList()
  },
  mounted() {
    this.widthheight()
    this.getStatisticsData()
  }
}
</script>
<style scoped>
.statistics .gantt_box {
  margin-bottom: 36px;
  box-sizing: border-box;
  border: 1px solid rgb(211, 211, 211);
}
.statistics .gantt_box:nth-of-type(3) {
  margin-bottom: 0;
}
</style>

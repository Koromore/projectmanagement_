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
      clientStatusData: []
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
      let data = {}
      this.$axios
        .post('/pmbs/api/statistic/listAjax', data)
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
        // console.log(listBusiness)
        for (let i = 0; i < listBusiness.length; i++) {
          let element = listBusiness[i]
          businessNameData.push(element.businessName)
          let clientList = []
          let listProject = element.listProject
          // for (let i = 0; i < listProject.length; i++) {
          //   let element_ = listProject[i];
          //   clientList.push(element_.clientId)
          // }
          let data = {
            value: element.listProject, //.length,
            name: element.businessName,
            clientList: clientList
          }
          businessListData.push(data)
          // console.log(data)
        }
        this.businessNameData = businessNameData // 业务名称
        this.businessListData = businessListData // 业务数量和业务包含的客户
        console.log(this.businessNameData)
        console.log(this.businessListData)

        // 项目状态
        let listProjectStatus = statisticsData.listProjectStatus
        let statusNameData = []
        let statusListData = []
        // console.log(listProjectStatus)
        for (let i = 0; i < listProjectStatus.length; i++) {
          let element = listProjectStatus[i]
          let data = {}
          data.value = element.ratio
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

        // 甘特图
        this.business_gantt(businessNameData,businessListData)
        this.project_state_gantt()
        this.client_state_gantt()
      }
    },
    // 业务占比甘特图
    business_gantt(name,list) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('business'))
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
          data: ['口碑', '网站', '数字营销', 'APP']
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
            data: [
              {
                value: 335,
                name: '口碑',
                clientList: ['吉利', '沃尔沃', '长城']
              },
              {
                value: 310,
                name: '网站',
                clientList: ['吉利', '沃尔沃', '长城']
              },
              {
                value: 234,
                name: '数字营销',
                clientList: ['吉利', '沃尔沃', '长城']
              },
              {
                value: 135,
                name: 'APP',
                clientList: ['吉利', '沃尔沃', '长城']
              }
            ]
            // data: list
          }
        ]
      })
    },
    // 项目状态甘特图
    project_state_gantt() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('project_state'))
      // 绘制图表
      myChart.setOption({
        title: { text: '项目状态', padding: 16 },
        color: ['#23D7BB', '#f5b96a', '#FF0000', '#C9C9C9'],
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
          data: ['执行中', '审核中', '延期', '已完成']
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
            data: [
              { value: 335, name: '执行中' },
              { value: 310, name: '审核中' },
              { value: 234, name: '延期' },
              { value: 234, name: '已完成' }
            ]
          }
        ]
      })
    },
    // 客户状态甘特图
    client_state_gantt() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('client_state'))
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
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '客户1',
              '客户2',
              '客户3',
              '客户4',
              '客户5',
              '客户6',
              '客户7',
              '客户8',
              '客户9',
              '客户10'
            ],
            triggerEvent: true //让x轴可以点击
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '延期',
            type: 'bar',
            stack: '广告',
            data: [120, 132, 101, 134, 90, 230, 210, 210, 210, 210],
            nodeClick: 'link'
          },
          {
            name: '审核中',
            type: 'bar',
            stack: '广告',
            data: [220, 182, 191, 234, 290, 330, 310, 210, 210, 210]
          },
          {
            name: '执行中',
            type: 'bar',
            stack: '广告',
            data: [150, 232, 201, 154, 190, 330, 410, 210, 210, 210]
          }
        ]
      }),
        myChart.on('click', function(params) {
          console.log(params)
        })
    }
  },
  // 钩子函数
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
</style>

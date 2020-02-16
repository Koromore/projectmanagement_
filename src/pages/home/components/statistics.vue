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
        <div id="client_state" :style="{width: '100%', height: '500px'}"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'statistics',
  data() {
    return {}
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
    // 业务占比甘特图
    business_gantt() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('business'))
      // 绘制图表
      myChart.setOption({
        // 标题
        title: { text: '业务占比' },
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
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        // 图例
        legend: {
          type: 'scroll',
          icon: 'circle',
          orient: 'horizontal',
          bottom: 10,
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
          ]
        },
        series: [
          {
            name: '访问来源',
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
              { value: 335, name: '客户1' },
              { value: 310, name: '客户2' },
              { value: 234, name: '客户3' },
              { value: 135, name: '客户4' },
              { value: 1548, name: '客户5' },
              { value: 335, name: '客户6' },
              { value: 310, name: '客户7' },
              { value: 234, name: '客户8' },
              { value: 135, name: '客户9' },
              { value: 1548, name: '客户10' }
            ]
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
        title: { text: '项目状态' },
        color: ['#C9C9C9', '#FF0000', '#23D7BB'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          // type: 'scroll',
          icon: 'circle',
          orient: 'horizontal',
          // left: 40,
          bottom: 10,
          align: 'auto',
          data: ['直接访问', '邮件营销', '联盟广告']
        },
        series: [
          {
            name: '访问来源',
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
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' }
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
          }
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
          data: ['邮件营销', '联盟广告', '视频广告']
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
            name: '邮件营销',
            type: 'bar',
            stack: '广告',
            data: [120, 132, 101, 134, 90, 230, 210, 210, 210, 210],
            nodeClick: 'link'
          },
          {
            name: '联盟广告',
            type: 'bar',
            stack: '广告',
            data: [220, 182, 191, 234, 290, 330, 310, 210, 210, 210]
          },
          {
            name: '视频广告',
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
    this.business_gantt()
    this.project_state_gantt()
    this.client_state_gantt()
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

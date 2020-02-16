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
      data: [
        {
          id: 2,
          name: '租房子',
          startDate: '2019-09-20',
          endDate: '2019-12-31'
        },
        {
          id: 3,
          name: '云台之间',
          startDate: '2019-09-01',
          endDate: '2019-09-09'
        },
        {
          id: 4,
          name: '日落云巅',
          startDate: '2019-09-01',
          endDate: '2019-09-09'
        },
        {
          id: 5,
          name: '天空之镜',
          startDate: '2019-09-08',
          endDate: '2019-10-02'
        },
        {
          id: 6,
          name: '蓬莱之岛',
          startDate: '2019-10-20',
          endDate: '2019-11-10'
        },
        {
          id: 7,
          name: '西塘之南',
          startDate: '2019-12-02',
          endDate: '2019-12-07'
        },
        {
          id: 8,
          name: '凤凰之缘',
          startDate: '2020-01-01',
          endDate: '2020-01-10'
        }
      ]
    }
  },
  methods: {
    timeChange(row) {
      console.log(row)
    },
    // 获取页面传参
    getParams() {
      let id = this.$route.query.id
      console.log(id)
    },
    // 甘特图
    gantt() {
      // console.log("gantt")
      // 1 审核中 2 执行中 3 已完成 4 延期
      let data = [
        {
          gunter_id: 1,
          params: {
            title: '网络营销',
            execute_pop: '张三',
            state_text: '延期',
            state: 4,
            start_time: '2018-12-20',
            end_time: '2019-1-3'
          },
          start_time: new Date('2018-12-20').getTime(),
          end_time: new Date('2019-1-3').getTime(),
          bg_color: 'yellow',
          level: 1
        },
        {
          gunter_id: 2,
          params: {
            title: '网络营销',
            execute_pop: '张三',
            state_text: '审核中',
            state: 1,
            start_time: '2018-12-19',
            end_time: '2019-1-3'
          },
          start_time: new Date('2018-12-19').getTime(),
          end_time: new Date('2019-1-3').getTime(),
          level: 1
        },
        {
          gunter_id: 3,
          params: {
            title: '网络营销',
            execute_pop: '张三',
            state_text: '执行中',
            state: 2,
            start_time: '2018-12-19',
            end_time: '2019-1-3'
          },
          start_time: new Date('2018-12-19').getTime(),
          end_time: new Date('2019-1-3').getTime(),
          level: 1
        },
        {
          gunter_id: 4,
          params: {
            title: '网络营销',
            execute_pop: '张三',
            state_text: '已完成',
            state: 3,
            start_time: '2018-12-19',
            end_time: '2019-1-3'
          },
          start_time: new Date('2018-12-19').getTime(),
          end_time: new Date('2019-1-3').getTime(),
          level: 1
        },
        {
          gunter_id: 5,
          params: {
            title: '网络营销',
            execute_pop: '张三',
            state_text: '已完成',
            state: 3,
            start_time: '2018-12-19',
            end_time: '2019-1-3'
          },
          start_time: new Date('2018-12-19').getTime(),
          end_time: new Date('2019-1-3').getTime(),
          level: 1
        },
        {
          gunter_id: 6,
          params: {
            title: '网络营销',
            execute_pop: '张三',
            state_text: '已完成',
            state: 3,
            start_time: '2018-12-19',
            end_time: '2019-1-3'
          },
          start_time: new Date('2018-12-19').getTime(),
          end_time: new Date('2019-1-3').getTime(),
          level: 1
        }
      ]
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        if (element.params.state == 1) {
          element.bg_color = 'rgb(236, 185, 21)'
        } else if (element.params.state == 2) {
          element.bg_color = 'rgb(1, 176, 114)'
        } else if (element.params.state == 3) {
          element.bg_color = 'rgb(172, 171, 171)'
        } else if (element.params.state == 4) {
          element.bg_color = 'rgb(255, 0, 0)'
        }
      }
      // console.log(data)
      let th_data = {
        title: {
          value: '部门',
          width: 150,
          showToast: true,
          listen_click: false
        },
        execute_pop: {
          value: '执行人',
          width: 130,
          showToast: true,
          chooseTime: false
          // time_mode: 1
        },
        state_text: {
          value: '状态',
          width: 130,
          showToast: true,
          chooseTime: false
          // time_mode: 2
        }
      }
      let num = (data.length + 1) * 45 + 1
      let height = num + 'px'
      this.$gante({
        container: '.gantt_time',
        ganteData: data,
        start_time: new Date('2018/12/15').getTime(),
        end_time: new Date('2019/2/4').getTime(),
        tabe_width: '459px',
        open: true,
        height: height,
        time_mode: 1,
        th_data: th_data,
        onEdit(data) {
          console.log(data)
        },
        onClick(data) {
          console.log(data)
        }
      })
      // console.log('gantt')
    },
    // 返回上一页
    return_() {
			this.$router.go(-1)
			sessionStorage.setItem("refresh", 0);
    },
    refresh() {
      // console.log(this.$store.state.refresh)
      // location.reload()
			var refresh = sessionStorage.getItem('refresh')
			if (refresh == 0) {
				location.reload()
				sessionStorage.setItem("refresh", 1);
			}
    }
  },
  created() {
    // let seif = this
    // seif.getParams()
  },
  // 钩子函数 实例挂载之后
  mounted() {
    let seif = this
    seif.getParams()
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
}
/* .wl-gantt-demo {
  margin: 40px auto;
  width: 1000px;
} */
</style>
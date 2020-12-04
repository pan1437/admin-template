<template>
  <div class="home">
    <div class="modular_1">
      <p class="title">
        <img src="../../assets/image/title.png" alt="标题" />
        <strong style="padding-left: 10px;">经营数据指标</strong>
      </p>
      <div class="header">
        <div
          class="content"
          v-for="(item, index) in listInfo.fieldList"
          :key="index"
        >
          <img style="width:50px" :src="item.url" :alt="item.label" />
          <div class="text-box">
            <p class="font-tips">{{ item.label }}</p>
            <p style="color: #0066ff; text-align: center;">
              {{ information[item.value] }}&nbsp;<span>{{ item.company }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="modular_2">
      <p class="title">
        <img src="../../assets/image/title.png" alt="标题" />
        <strong style="padding-left: 10px;">数据视图</strong>
      </p>
      <div class="plot_modular">
        <div class="echart_box">
          <div id="echart_first"></div>
        </div>
        <div class="echart_box">
          <div id="echart_second"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入 echarts 主模块。
var echarts = require('echarts')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
import chartApi from '@/apis/chartApi'
export default {
  name: '',

  data() {
    return {
      information: {},
      serveForm: {
        time: ''
      },
      studentForm: {},
      listInfo: {
        fieldList: [
          {
            label: '总用户数',
            url: require('../../assets/image/icon_01.png'),
            value: 'user_count',
            company: '(个)'
          },
          {
            label: '学员总数',
            url: require('../../assets/image/icon_02.png'),
            value: 'student_count',
            company: '(个)'
          },
          {
            label: '服务中心总数',
            url: require('../../assets/image/icon_03.png'),
            value: 'agent_count',
            company: '(个)'
          },
          {
            label: '总代理加盟费',
            url: require('../../assets/image/icon_04.png'),
            value: 'agent_amount_count',
            company: '(元)'
          },
          {
            label: '总学员报名费',
            url: require('../../assets/image/icon_05.png'),
            value: 'student_amount_count',
            company: '(元)'
          },
          {
            label: '总学员报名消耗名额',
            url: require('../../assets/image/icon_06.png'),
            value: 'student_quota_count',
            company: '(个)'
          },
          {
            label: '总提现金额',
            url: require('../../assets/image/icon_07.png'),
            value: 'withdrawal_count',
            company: '(元)'
          }
        ]
      },
      firstForm: {
        data: [], //x轴
        count: [], //服务中心数
        amountCount: [], //服务中心加盟费
        withdrawalCount: [] //服务中心提现费用
      },
      secondForm: {
        data: [], //x轴
        count: [], //学员报名数
        quotaCount: [], //学员报名消耗名额数
        amountCount: [] //学员收款金额
      },
      //tips样式
      axisPointer: {
        label: {
          show: true,
          backgroundColor: '#fff',
          color: '#556677',
          borderColor: 'rgba(0,0,0,0)',
          shadowColor: 'rgba(0,0,0,0)',
          shadowOffsetY: 0
        },
        lineStyle: {
          width: 0
        }
      }
    }
  },

  mounted() {
    this.getFirstChart()
    this.getSendChart()
    this.getIndexData()
  },
  methods: {
    getIndexData() {
      chartApi.indexData().then(res => {
        this.information = res.data
      })
    },
    //服务图表
    getFirstChart(data) {
      chartApi.serviceChart(data).then(res => {
        this.firstForm = {
          data: res.data.agent_count.map(item => item.month),
          count: res.data.agent_count.map(item => item.count),
          amountCount: res.data.agent_amount_count.map(item => item.count),
          withdrawalCount: res.data.agent_withdrawal_count.map(
            item => item.count
          )
        }
        this.firstEchart()
      })
    },
    getSendChart(data) {
      chartApi.studentChart(data).then(res => {
        this.secondForm = {
          data: res.data.student_count.map(item => item.month),
          count: res.data.student_count.map(item => item.count),
          quotaCount: res.data.student_quota_count.map(item => item.count),
          amountCount: res.data.student_amount_count.map(item => item.count)
        }
        this.secondEchart()
      })
    },
    firstEchart() {
      var myChart = echarts.init(
        document.getElementById('echart_first'),
        'light'
      )
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '服务中心走势图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: this.axisPointer
        },
        legend: {
          data: [
            '新增服务中心数量（个）',
            '新增服务代理加盟费（万元）',
            '新增提现费用（万元）'
          ],
          left: '30%'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
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
            boundaryGap: false,
            data: this.firstForm.data
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#DCE2E8'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#556677'
              },
              formatter: '{value} 个'
            },
            splitLine: {
              show: false
            }
          },
          {
            type: 'value',
            position: 'right',
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#556677'
              },
              formatter: '{value} 万元'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#DCE2E8'
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '新增服务中心数量（个）',
            type: 'line',
            // stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {},
            data: this.firstForm.count,
            symbolSize: 1,
            yAxisIndex: 0,
            showSymbol: false,
            symbol: 'circle',
            smooth: true
          },
          {
            name: '新增服务代理加盟费（万元）',
            type: 'line',
            // stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {},
            data: this.firstForm.amountCount,
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            yAxisIndex: 1,
            showSymbol: false
          },
          {
            name: '新增提现费用（万元）',
            type: 'line',
            // stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {},
            data: this.firstForm.withdrawalCount,
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            yAxisIndex: 1,
            showSymbol: false //是否展示顶点
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    secondEchart() {
      var myChart = echarts.init(
        document.getElementById('echart_second'),
        'light'
      )
      // 指定图表的配置项和数据
      var option_1 = {
        title: {
          text: '学员-收款走势图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: this.axisPointer
        },
        legend: {
          data: [
            '学员报名数（个）',
            '学员报名消耗名额数（个）',
            '学员收款金额（万元）'
          ],
          left: '30%'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
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
            boundaryGap: false,
            data: this.secondForm.data
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#DCE2E8'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#556677'
              },
              formatter: '{value} 个'
            },
            splitLine: {
              show: false
            }
          },
          {
            type: 'value',
            position: 'right',
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#556677'
              },
              formatter: '{value} 万元'
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#DCE2E8'
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '学员报名数（个）',
            type: 'line',
            // stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {},
            data: this.secondForm.count,
            symbolSize: 1,
            yAxisIndex: 0,
            showSymbol: false,
            symbol: 'circle',
            smooth: true
          },
          {
            name: '学员报名消耗名额数（个）',
            type: 'line',
            // stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {},
            data: this.secondForm.quotaCount,
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false
          },
          {
            name: '学员收款金额（万元）',
            type: 'line',
            // stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {},
            data: this.secondForm.amountCount,
            symbolSize: 1,
            symbol: 'circle',
            smooth: true,
            yAxisIndex: 1,
            showSymbol: false //是否展示顶点
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option_1)
    }
  },

  watch: {}
}
</script>
<style lang="scss" scoped>
.home {
  background-color: #f2f2f2;
  padding-bottom: 30px;
  width: 100%;

  .title {
    display: flex;
    align-items: center;
    padding: 20px 0 0px 15px;
  }

  .modular_1 {
    width: 100%;
    height: auto;

    .header {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      margin-left: 1%;

      .content {
        width: 210px;
        height: 100px;
        background: #fff;
        border-radius: 5px;
        margin: 20px 20px 20px 0px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        .text-box {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;

          .font-tips {
            text-align: center;
          }
        }
      }
    }
  }

  .modular_2 {
    width: 100%;
    height: fit-content;
    margin-top: 40px;

    .plot_modular {
      height: auto;
      width: 100%;

      .block {
        display: flex;
        justify-content: flex-end;
        margin-right: 3%;
      }

      .echart_box {
        margin-left: 1%;
        background: #fff;
        border-radius: 5px;
        width: 96%;
        height: 500px;
        margin-top: 25px;

        #echart_first {
          padding: 30px;
          height: 500px;
          width: 100%;
        }

        #echart_second {
          padding: 30px;
          height: 500px;
          width: 100%;
        }
      }
    }
  }
}
</style>

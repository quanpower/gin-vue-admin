<template>
  <v-chart
    class="echarts"
    theme="default"
    :options="option"
    :auto-resize="true"
  >
  </v-chart>
</template>

<script>

  const colors = ['#5470C6', '#91CC75', '#EE6666','#EE6666']

  export default {
    name: 'barChart',
    props: ['data'],

    data () {
      return {
        // echarts
        option: {
          color: colors,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '20%'
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          legend: {
            data: ['电压', '电流', '功率','转速']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              // prettier-ignore
              data: ['1', ]
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '电压',
              min: 0,
              max: 5,
              position: 'right',
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: '{value} V'
              }
            },
            {
              type: 'value',
              name: '电流',
              min: 0,
              max: 10,
              position: 'right',
              offset: 80,
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: '{value} A'
              }
            },
            {
              type: 'value',
              name: '功率',
              min: 0,
              max: 25,
              position: 'left',
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[2]
                }
              },
              axisLabel: {
                formatter: '{value} KW'
              }
            },
            {
              type: 'value',
              name: '转速',
              min: 0,
              max: 5,
              position: 'right',
              axisLine: {
                show: true,
                lineStyle: {
                  color: colors[3]
                }
              },
              axisLabel: {
                formatter: '{value} R'
              }
            },
          ],
          series: [
            {
              name: '电压',
              type: 'bar',
              data: [
                2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
              ]
            },
            {
              name: '电流',
              type: 'bar',
              yAxisIndex: 1,
              data: [
                2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
              ]
            },
            {
              name: '功率',
              type: 'line',
              yAxisIndex: 2,
              data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            },
            {
              name: '转速',
              type: 'line',
              yAxisIndex: 3,
              data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            },          
          ]
        },

      }
    },

    mounted () {

    },
    computed: {
      cards: {
        get: function () {
          console.log('--------cards----')
          const cards = this.$store.state.bigdata.cardList.map(function (item, index, arr) {
            const imgSrc = this.getAvatarString(item.imgSrc)
            const boardAlarm = this.getColor(item.boardAlarm)
            const pressureAlarm = this.getColor(item.pressureAlarm)
            return { title: item.title, imgSrc: imgSrc, config: item.config, boardAlarm: boardAlarm, pressureAlarm: pressureAlarm }
          }, this)
          console.log(cards)
          return cards
        }
      }
    },
    methods: {
      getAvatarString (str) {
        const http = 'http'
        const HTTP = 'HTTP'
        const isIncludeHttp = str.search(http) !== -1 || str.search(HTTP) !== -1
        // console.log('======isIncludeHttp======')
        // console.log(isIncludeHttp)
        if (isIncludeHttp) {
          return str
        } else {
          return require('@/statics' + str)
        }
      },
      getColor (val) {
        if (val === true) {
          return 'red'
        } else {
          return 'green'
        }
      }
    }
  }
</script>

<style lang="less">
  .echarts {
    width: 100%;
    height: 400px;
  }
</style>

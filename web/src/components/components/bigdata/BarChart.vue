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

      }
    },

    mounted () {

    },
    computed: {

      option: {
        get: function () {

          const chart_option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['电压', '电流', '功率','转速']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01]
            },
            yAxis: {
              type: 'category',
              data: ['电压', '电流', '功率','转速'],
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#ffffff'
                }
              },
            },
            series: [
              {
                name: 'value',
                type: 'bar',
                data: this.data,

                itemStyle: {
                  normal: {
                    label: {
                      show: true,  //开启显示
                      position: 'in',  //在上方显示
                      textStyle: {  //数值样式
                        color: 'black',
                        fontSize: 16
                      }
                    }
                  }
                },

              },
            ]
          }
          return chart_option
        }
      },

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

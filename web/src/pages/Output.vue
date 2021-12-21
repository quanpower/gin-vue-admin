
<template>
  <div class="q-pa-md">
    <q-card>
          <q-card-section>
            <div class="text-h6 text-indigo-8">
              产量统计
            </div>
            <div class="text-subtitle2">
              选择下列条件，查询每天产量统计。
            </div>
          </q-card-section>

          <q-separator></q-separator>

          <div class="q-gutter-md row">
            <!-- <DateTimeInput :date='startTime'></DateTimeInput> -->
            <DateTimeInput label="起始时间" @inputChanged="setStartTime"></DateTimeInput>
            <DateTimeInput label="结束时间" @inputChanged="setEndTime"></DateTimeInput>
            <q-space />
            <q-btn dense color="secondary" label="查询" @click="searchProductionOrderCount" />
          </div>

          <q-separator></q-separator>  
      
          <v-chart
            class="echarts"
            theme="default"
            :options="option"
            :auto-resize="true"
          >
          </v-chart>

          <q-table
            title="产量统计"
            separator="cell"
            :data="Data"
            :columns="columns"
            row-key="name"
            :pagination.sync="pagination"

          >
        <template v-slot:top-right="props">
          <q-input borderless dense debounce="300"  placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input>

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            v-if="mode === 'list'" class="q-px-sm"
          >
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
            </q-tooltip>
          </q-btn>

          <q-btn
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
          />
        </template>

            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                  <q-badge  class="q-mr-sm" :color="getColor(props.row.status)"  />
              </q-td>
            </template>  

          </q-table>

    </q-card>    

  </div>
</template>

<script>
import {exportFile} from 'quasar'

function wrapCsvValue(val, formatFn) {
    let formatted = formatFn !== void 0
        ? formatFn(val)
        : val

    formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted)

    formatted = formatted.split('"').join('""')
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`
}
  // 对Date的扩展，将 Date 转化为指定格式的String
  // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
  // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
  // 例子： 
  // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
  // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
  Date.prototype.Format = function (fmt) {
      var o = {
          "M+": this.getMonth() + 1, //月份 
          "d+": this.getDate(), //日 
          "H+": this.getHours(), //小时 
          "m+": this.getMinutes(), //分 
          "s+": this.getSeconds(), //秒 
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
          "S": this.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
  }
 

  // 调用： 
  // var date1 = new Date().Format("yyyy-MM-dd");
  // var date2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
  function getStartTime() {

      var now = new Date;
      now.setMinutes(now.getMinutes() - 60);
      var stime = now.format("yyyy-MM-dd HH:mm:ss");//一个小时前的时间    

      // const CURRENT_TIME = new Date().Format("yyyy-MM-dd HH:mm:ss")
      return stime
  }

  function getCurrentTime() {
      const CURRENT_TIME = new Date().Format("yyyy_MM_dd_HH_mm_ss")
      return CURRENT_TIME
  }

export default {
  name: 'Output',
  components: {
      DateTimeInput: () =>  import('components/time/DateTimeInput'),
  },   
  data () {
    return {
        export_report: false,

        columns: [
          {name: 'Date', align: 'left', label: 'Date', field: 'Date', sortable: true},
          {name: 'time_0', align: 'left', label: '0:30-1:30', field: 'time_0'},
          {name: 'time_1', align: 'left', label: '1:30-2:30', field: 'time_1'},
          {name: 'time_2', align: 'left', label: '2:30-3:30', field: 'time_2'},
          {name: 'time_3', align: 'left', label: '3:30-4:30', field: 'time_3'},
          {name: 'time_4', align: 'left', label: '4:30-5:30', field: 'time_4'},
          {name: 'time_5', align: 'left', label: '5:30-6:30', field: 'time_5'},
          {name: 'time_6', align: 'left', label: '6:30-7:30', field: 'time_6'},
          {name: 'time_7', align: 'left', label: '7:30-8:30', field: 'time_7'},
          {name: 'time_8', align: 'left', label: '8:30-9:30', field: 'time_8'},
          {name: 'time_9', align: 'left', label: '9:30-10:30', field: 'time_9'},
          {name: 'time_10', align: 'left', label: '10:30-11:30', field: 'time_10'},
          {name: 'time_11', align: 'left', label: '11:30-12:30', field: 'time_11'},
          {name: 'time_12', align: 'left', label: '12:30-13:30', field: 'time_12'},
          {name: 'time_13', align: 'left', label: '13:30-14:30', field: 'time_13'},
          {name: 'time_14', align: 'left', label: '14:30-15:30', field: 'time_14'},
          {name: 'time_15', align: 'left', label: '15:30-16:30', field: 'time_15'},
          {name: 'time_16', align: 'left', label: '16:30-17:30', field: 'time_16'},
          {name: 'time_17', align: 'left', label: '17:30-18:30', field: 'time_17'},
          {name: 'time_18', align: 'left', label: '18:30-19:30', field: 'time_18'},
          {name: 'time_19', align: 'left', label: '19:30-20:30', field: 'time_19'},
          {name: 'time_20', align: 'left', label: '20:30-21:30', field: 'time_20'},
          {name: 'time_21', align: 'left', label: '21:30-22:30', field: 'time_21'},
          {name: 'time_22', align: 'left', label: '22:30-23:30', field: 'time_22'},
          {name: 'total', align: 'left', label: 'Total', field: 'total', sortable: true},
        ],
        pagination: {
            rowsPerPage: 20
        }, 
        filter: '',
        mode:'list',
    }
  },
  mounted() {
  },


  computed: {
    // 计算属性的 getter
    Data: {
      get: function () {
        const production_order_count = this.$store.state.production_order.production_order_count
        console.log(production_order_count)
        return production_order_count
      }
    },

    Date: {
      get: function () {
        const production_order_count = this.$store.state.production_order.production_order_count
        let date_list = []

        for(const production_order of production_order_count){
          date_list.push(production_order.Date)
        }
        return date_list
      }
    },
    
    totalData: {
      get: function () {
        const production_order_count = this.$store.state.production_order.production_order_count
        let total_list = []

        for(const production_order of production_order_count){
          total_list.push(production_order.total)

        return total_list
        }
      }
    },

    chart_data: {
      get: function () {
        const production_order_count = this.$store.state.production_order.production_order_count

        let output_list = []
        for(const production_order of production_order_count){
          let output=[]

          output[0] = parseInt(production_order.time_0)        
          output[1] = parseInt(production_order.time_1)        
          output[2] = parseInt(production_order.time_2)
          output[3] = parseInt(production_order.time_3)
          output[4] = parseInt(production_order.time_4)
          output[5] = parseInt(production_order.time_5)
          output[6] = parseInt(production_order.time_6)
          output[7] = parseInt(production_order.time_7)
          output[8] = parseInt(production_order.time_8)
          output[9] = parseInt(production_order.time_9)
          output[10] = parseInt(production_order.time_10)
          output[11] = parseInt(production_order.time_11)
          output[12] = parseInt(production_order.time_12)
          output[13] = parseInt(production_order.time_13)
          output[14] = parseInt(production_order.time_14)
          output[15] = parseInt(production_order.time_15)
          output[16] = parseInt(production_order.time_16)
          output[17] = parseInt(production_order.time_17)
          output[18] = parseInt(production_order.time_18)
          output[19] = parseInt(production_order.time_19)
          output[20] = parseInt(production_order.time_20)
          output[21] = parseInt(production_order.time_21)
          output[22] = parseInt(production_order.time_22)

          // const output_dict = {name: production_order.Date, data: output}
          // output_list.push(output_dict)
          output_list.push(output)
        }

        // console.log('=====output_list====')
        // console.log(output_list)
        // 二维数组转置
        var newArray = (output_list[0] || []).map(function (col, i) {
            return output_list.map(function (row) {
                return row[i];
            })
        });

        return newArray
      }
    },

    chart_series: {
      get: function () {
        const chart_data = this.chart_data
        let series = (chart_data || []).map((item, index) => {
            const item_dict = {
              name: 'time_'+ index,
              type: 'bar',
              stack: 'stack_',
              barWidth: 30,
              emphasis: {
                focus: 'series'
              },
              label: {
                normal: {
                  show: true,
                  // position: 'insideRight',
                  formatter: this.zero_format()
                }
              },
              data: item,
            }

            return item_dict
        })

        let totalBar = {
          name: '总计',
          type: 'bar',
          stack: 'stack_',
          barWidth: 30,
          label: {
              normal: {
                  show: true,
                  position: 'top',
                  color: '#000'
              }
          },
          z: -1,
          //不同系列的柱间距离，为百分比,如果想要两个系列的柱子重叠，可以设置 barGap 为 '-100%'。
          barGap: '-100%', 
          data: this.totalData
        }
        console.log(series)

        return series
      }
    },

    option: {
      get: function () {

        const chart_option = {
          // title: {
          //   text: '产量统计图'
          // },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            data:  this.Date
          },
          yAxis: {
            type: 'value',
          },
          series: this.chart_series
        }
        console.log(chart_option)
        return chart_option
      }
    }, 
  },


  methods: {
    
    setStartTime(data){
      this.startTime = data
    },
    setEndTime(data){
      this.endTime = data
    },
    searchProductionOrderCount() {
      const payload = {
        startTime: this.startTime,
        endTime: this.endTime,
      }
      console.log(payload)
      this.$store.dispatch('searchProductionOrderCount', payload)
    },  
    zero_format(){
      return function (params) {
        if (params.value > 0) {
          return params.value;
        } else {
          return '';
        }
      }
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
          this.Data.map(row => this.columns.map(col => wrapCsvValue(
              typeof col.field === 'function'
                  ? col.field(row)
                  : row[col.field === void 0 ? col.name : col.field],
              col.format
          )).join(','))
      ).join('\r\n')

      const status = exportFile(
          '产量统计' + getCurrentTime() + '.csv',
          content,
          'text/csv'
      )

      if (status !== true) {
          this.$q.notify({
              message: 'Browser denied file download...',
              color: 'negative',
              icon: 'warning'
          })
      }
    },      

  },
  destroyed () {
      // 销毁监听
    // clearInterval(this.timer)
  },
}
</script>

<style lang="css" scoped>
 .echarts {
   width: 100%;
   height: 400px;
 }
</style>
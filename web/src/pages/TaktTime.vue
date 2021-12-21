
<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-indigo-8">
          停线统计
        </div>
        <div class="text-subtitle2">
          选择下列条件，查询订单各工位停线统计。
        </div>
      </q-card-section>

      <q-separator></q-separator>


      <div class="q-gutter-md row">
        <!-- <DateTimeInput :date='startTime'></DateTimeInput> -->
        <DateTimeInput label="起始时间" @inputChanged="setStartTime"></DateTimeInput>
        <DateTimeInput label="结束时间" @inputChanged="setEndTime"></DateTimeInput>
        <q-space />
      </div>

      <q-separator></q-separator>  

      <div class="q-gutter-md row">
        <q-input dense filled v-model="WO" clearable clear-icon="close" label="工单号" />
        <q-input dense filled v-model="PO" clearable clear-icon="close" label="生产订单号" />
        <q-input dense filled v-model="PN" clearable clear-icon="close" label="桥总成PN" />
        <q-input dense filled v-model="SN" clearable clear-icon="close" label="桥总成SN" />
        <q-input dense filled v-model="CN" clearable clear-icon="close" label="桥总成CN" />

        <!-- <q-input dense filled v-model="status" label="订单状态" /> -->
        <q-space />  
        <q-btn dense color="secondary" label="按总成查询" @click="searchProductionOrderByAxle" />
      </div>

      <v-chart
        class="echarts"
        theme="default"
        :options="option"
        :auto-resize="true"
      >
      </v-chart>

      <q-table
        title="停线统计"
        separator="cell"
        :data="data"
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
  name: 'StopTime',
  components: {
      DateTimeInput: () =>  import('components/time/DateTimeInput'),
  },  
  data () {
    return {
          startTime: '',
          endTime: '',
          WO: '',
          PO: '',
          PN: '',
          SN: '',
          CN: '',
          C_PN: '',
          C_SN: '',
          status: -5,
          export_report: false,
          filter: '',
          mode:'list',
        columns: [
          {name: 'create_time', align: 'left', label: 'DateTime', field: 'create_time', sortable: true},
          {name: 'work_order_name', align: 'left', label: 'WO', field: 'work_order_name', sortable: true},
          {name: 'production_order_name', align: 'left', label: 'PO', field: 'production_order_name', sortable: true},
          {name: 'axle_pn', align: 'left', label: 'PN', field: 'axle_pn', sortable: true},
          {name: 'axle_sn', align: 'left', label: 'SN', field: 'axle_sn', sortable: true},
          // {name: 'axle_cn', align: 'left', label: 'CN', field: 'axle_cn', sortable: true},
          {name: 'OP05', align: 'center', label: 'OP05', field: 'OP05'},
          {name: 'OP10', align: 'center', label: 'OP10', field: 'OP10'},
          {name: 'OP20', align: 'center', label: 'OP20', field: 'OP20'},
          {name: 'OP30', align: 'center', label: 'OP30', field: 'OP30'},
          {name: 'OP40', align: 'center', label: 'OP40', field: 'OP40'},
          {name: 'OP50', align: 'center', label: 'OP50', field: 'OP50'},
          {name: 'OP60', align: 'center', label: 'OP60', field: 'OP60'},
          {name: 'OP70', align: 'center', label: 'OP70', field: 'OP70'},
          {name: 'OP80', align: 'center', label: 'OP80', field: 'OP80'},
          {name: 'OP90', align: 'center', label: 'OP90', field: 'OP90'},
          {name: 'OP100', align: 'center', label: 'OP100', field: 'OP100'},
          {name: 'OP110', align: 'center', label: 'OP110', field: 'OP110'},
          {name: 'OP120', align: 'center', label: 'OP120', field: 'OP120'},
          // {name: 'description', align: 'left', label: '描述', field: 'description'},          
        ],
        
        pagination: {
            rowsPerPage: 50
        }, 

    }
  },
  mounted() {
    // this.$store.dispatch('GetStopTime')
  },


  computed: {
    // 计算属性的 getter
    data: {
      get: function () {
        const production_ordersTemp = this.$store.state.production_order.production_orders

        console.log('===production_ordersTemp====')
        console.log(production_ordersTemp)

        let stop_time_list = []
        for(const production_order of production_ordersTemp){
          let stop_time={}
          stop_time.create_time = production_order.create_time
          stop_time.work_order_name = production_order.work_order_name
          stop_time.production_order_name = production_order.production_order_name
          stop_time.axle_pn = production_order.axle_pn
          stop_time.axle_sn = production_order.axle_sn
          stop_time.OP05 = production_order.stop_time_dict.OP05
          stop_time.OP10 = production_order.stop_time_dict.OP10
          stop_time.OP20 = production_order.stop_time_dict.OP20
          stop_time.OP30 = production_order.stop_time_dict.OP30
          stop_time.OP40 = production_order.stop_time_dict.OP40
          stop_time.OP50 = production_order.stop_time_dict.OP50
          stop_time.OP60 = production_order.stop_time_dict.OP60
          stop_time.OP70 = production_order.stop_time_dict.OP70
          stop_time.OP80 = production_order.stop_time_dict.OP80
          stop_time.OP90 = production_order.stop_time_dict.OP90
          stop_time.OP100 = production_order.stop_time_dict.OP100
          stop_time.OP110 = production_order.stop_time_dict.OP110
          stop_time.OP120 = production_order.stop_time_dict.OP120



          stop_time_list.push(stop_time)
        }

        return stop_time_list
      }
    },
    chart_data: {
      get: function () {
        const production_ordersTemp = this.$store.state.production_order.production_orders
        let stop_time_list = []
        for(const production_order of production_ordersTemp){
          let stop_time=[]
          stop_time[0] = parseInt(production_order.stop_time_dict.OP05)
          stop_time[1] = parseInt(production_order.stop_time_dict.OP10)
          stop_time[2]= parseInt(production_order.stop_time_dict.OP20)
          stop_time[3] = parseInt(production_order.stop_time_dict.OP30)
          stop_time[4] = parseInt(production_order.stop_time_dict.OP40)
          stop_time[5] = parseInt(production_order.stop_time_dict.OP50)
          stop_time[6] = parseInt(production_order.stop_time_dict.OP60)
          stop_time[7] = parseInt(production_order.stop_time_dict.OP70)
          stop_time[8]= parseInt(production_order.stop_time_dict.OP80)
          stop_time[9] = parseInt(production_order.stop_time_dict.OP90)
          stop_time[10] = parseInt(production_order.stop_time_dict.OP100)
          stop_time[11]= parseInt(production_order.stop_time_dict.OP110)
          stop_time[12] = parseInt(production_order.stop_time_dict.OP120)

          const stop_time_dict = {name: production_order.production_order_name, data: stop_time}
          stop_time_list.push(stop_time_dict)
        }
        console.log(stop_time_list)
        return stop_time_list
      }
    },
    chart_series: {
      get: function () {
        const chart_data = this.chart_data

        const series = chart_data.map((item, index) => {
            const series_dict =  {
              name: item.name,
              type: 'line',
              data: item.data,
            }
            return series_dict
        })
        console.log(series)
        return series
      }
    },
    option: {
      get: function () {

        const chart_option = {
          // title: {
          //   text: '停线统计图'
          // },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {},
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['OP05','OP10','OP20','OP30','OP40','OP50','OP60','OP70','OP80','OP90','OP100','OP110','OP120',],           
          },
          yAxis: {
            type: 'value',
          },
          series: this.chart_series
        }
        return chart_option
      }
    },    

  },

  methods:{
    searchProductionOrderByAxle() {
      const payload = {
        startTime: this.startTime,
        endTime: this.endTime,
        work_order_name: this.WO,
        production_order_name: this.PO,
        axle_pn: this.PN,
        axle_sn: this.SN,
        axle_cn: this.CN,
        status: this.status,
        export_report: this.export_report,
      }
      this.$store.dispatch('searchProductionOrderByAxle', payload)
    },

    setStartTime(data){
      this.startTime = data
    },
    setEndTime(data){
      this.endTime = data
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
          this.data.map(row => this.columns.map(col => wrapCsvValue(
              typeof col.field === 'function'
                  ? col.field(row)
                  : row[col.field === void 0 ? col.name : col.field],
              col.format
          )).join(','))
      ).join('\r\n')

      const status = exportFile(
          '停线统计' + getCurrentTime() + '.csv',
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
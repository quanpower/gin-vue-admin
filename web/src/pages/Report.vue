<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-indigo-8">
          汇总报表
        </div>
        <div class="text-subtitle2">
          选择下列条件，查询历史记录。
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
        <q-btn dense color="secondary" label="按总成查询" @click="queryHistoryReportByAxle" />
      </div>

      <!-- <q-separator></q-separator>  

      <div class="q-gutter-md row">
        <q-input dense filled v-model="C_PN" clearable clear-icon="close" label="零件PN" />
        <q-input dense filled v-model="C_SN" clearable clear-icon="close" label="零件SN" />
        <q-space />    
        <q-btn dense color="secondary" label="按零件查询" @click="searchProductionOrderByPart" />
      </div> -->


      <q-table class="no-shadow"
        :data="data"
        title="汇总报表"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :filter="filter"
        :pagination.sync="pagination"
      >
        <template v-slot:top-right="props">
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
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
    
  </q-page>
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
      name: "History",

      components: {
          DateTimeInput: () =>  import('components/time/DateTimeInput'),
      },

      data() {
          return {
            // startTime: getCurrentTime(),
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
            pagination: {
              rowsPerPage: 50
            },

          }
      },
      mounted () {
        const payload = { production_order_id: 1 }
        // this.$store.dispatch('get_production_order', payload)
      },

      computed: {
        data: {
          get: function () {
            const history_reportTemp = this.$store.state.production_order.history_report

            console.log('===history_reportTemp====')
            console.log(history_reportTemp)
            return history_reportTemp
          }
        },
        columns: {
          get: function () {
            const operations = ['OP05', 'OP10', 'OP20', 'OP30-L', 'OP30-R', 'OP40-L', 'OP40-R', 'OP50-L', 'OP50-R', 'OP60-L', 'OP60-R', 'OP70-L', 'OP70-R', 'OP80-L', 'OP80-R', 'OP90-L', 'OP90-R', 'OP100-L', 'OP100-R', 'OP110-L', 'OP110-R', 'OP120-L', 'OP120-R']
            let columnsTemp =  [
              {name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true},
              {name: 'create_time', align: 'left', label: '日期时间', field: 'create_time', sortable: true},
              {name: 'work_order_name', align: 'left', label: '工单号', field: 'work_order_name', sortable: true},
              {name: 'production_order_name', align: 'left', label: '生产订单号', field: 'production_order_name', sortable: true},
              {name: 'axle_pn', align: 'left', label: 'PN', field: 'axle_pn', sortable: true},
              {name: 'axle_sn', align: 'left', label: 'SN', field: 'axle_sn', sortable: true},
              {name: 'axle_cn', align: 'left', label: 'CN', field: 'axle_cn', sortable: true},
              {name: 'scan_result', align: 'center', label: '扫码结果', field: 'scan_result'},
              {name: 'test_result', align: 'center', label: '测试结果', field: 'test_result'},
              {name: 'status', align: 'center', label: '状态', field: 'status'},
              {name: 'description', align: 'left', label: '描述', field: 'description'},
            ]

            for (const operation of operations) {
              columnsTemp.push({name: operation + '_scan_' + 'update_time', align: 'center', label: operation + '扫码时间', field: operation + '_scan_' + 'update_time'})
              columnsTemp.push({name: operation + '_scan_' + 'task_name', align: 'center', label: operation + '扫码任务名', field: operation + '_scan_' + 'task_name'})
              columnsTemp.push({name: operation + '_scan_' + 'part_name', align: 'center', label: operation + '零件名', field: operation + '_scan_' + 'part_name'})
              columnsTemp.push({name: operation + '_scan_' + 'part_pn', align: 'center', label: operation + '零件PN', field: operation + '_scan_' + 'part_pn'})
              columnsTemp.push({name: operation + '_scan_' + 'part_sn', align: 'center', label: operation + '零件SN', field: operation + '_scan_' + 'part_sn'})
              columnsTemp.push({name: operation + '_scan_' + 'result', align: 'center', label: operation + '扫码结果', field: operation + '_scan_' + 'result'})
              columnsTemp.push({name: operation + '_scan_' + 'bypass', align: 'center', label: operation + 'Bypass', field: operation + '_scan_' + 'bypass'})

              columnsTemp.push({name: operation + '_test_' + 'update_time', align: 'center', label: operation + '测试时间', field: operation + '_test_' + 'update_time'})
              columnsTemp.push({name: operation + '_test_' + 'task_name', align: 'center', label: operation + '测试任务名', field: operation + '_test_' + 'task_name'})
              columnsTemp.push({name: operation + '_test_' + 'test_parameter', align: 'center', label: operation + '测试参数', field: operation + '_test_' + 'test_parameter'})
              columnsTemp.push({name: operation + '_test_' + 'data', align: 'center', label: operation + '测试数据', field: operation + '_test_' + 'data'})
              columnsTemp.push({name: operation + '_test_' + 'result', align: 'center', label: operation + '测试结果', field: operation + '_test_' + 'result'})
              columnsTemp.push({name: operation + '_test_' + 'bypass', align: 'center', label: operation + 'Bypass', field: operation + '_test_' + 'bypass'})
            }

            console.log('===columnsTemp====')
            console.log(columnsTemp)
            return columnsTemp
          }
        }
      },

      methods:{
        queryHistoryReportByAxle() {
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
          this.$store.dispatch('queryHistoryReportByAxle', payload)
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
              '汇总报表' + getCurrentTime() + '.csv',
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
      }
  }
</script>

<style scoped>

</style>

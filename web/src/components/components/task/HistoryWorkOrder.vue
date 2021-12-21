<template>
  <q-card>
    <q-card-section class="q-pa-none">
      <div class="q-gutter-md row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-table
              title="历史工单"
              dense
              :data="data"
              :columns="columns"
              row-key="name"
              :pagination="pagination"
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

                  <template v-slot:body-cell-progress="props">
                      <q-td :props="props">
                          <q-linear-progress dark :color="getColor(props.row.progress)" :value="props.row.progress/100"
                          />
                      </q-td>
                  </template>

                  <template v-slot:body-cell-status="props">
                      <q-td :props="props">
                          <q-chip class="float-right text-white text-capitalize" label="完成" color="positive"
                                  v-if="props.row.status==0"></q-chip>
                          <q-chip class="float-right text-white text-capitalize" label="等待" color="teal"
                                  v-if="props.row.status==1"></q-chip>
                          <q-chip class="float-right text-white text-capitalize" label="生产" color="blue"
                                  v-if="props.row.status==2"></q-chip>                          
                          <q-chip class="float-right text-white text-capitalize" label="暂停" color="grey"
                                  v-if="props.row.status==3"></q-chip>
                          <q-chip class="float-right text-white text-capitalize" label="封存" color="warning"
                                  v-if="props.row.status==4"></q-chip>                                
                          <q-chip class="float-right text-white text-capitalize" label="异常" color="negative"
                                  v-if="props.row.status==-1"></q-chip>
                      </q-td>
                  </template>

                  <template v-slot:body-cell-action="props">
                      <q-td :props="props">
                          <q-btn icon="play_arrow" color="blue" label="激活" flat dense @click="enable_work_order(props.row.name)" />
                          <!-- <q-btn icon="pause" color="secondary" label="暂停" flat dense @click="pause_work_order(props.row.name)" />
                          <q-btn icon="delete" color="red" label="封存" flat dense @click="stop_work_order(props.row.name)" /> -->
                      </q-td>
                  </template>

              </q-table>

          </div>
      </div>
    </q-card-section>
  </q-card>
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
  name: "HistoryWorkOrder",
  props: ['data'],
  data() {
    return {
      export_report: false,
      filter: '',
      mode:'list',

      columns: [
        {
        name: 'name',
        required: true,
        label: 'WO',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
        },
        { name: 'date', align: 'center', label: 'Date', field: 'date', sortable: true },
        { name: 'PN_1', align: 'center', label: 'PN_1', field: 'PN_1', sortable: true },
        { name: 'PN_2', align: 'center', label: 'PN_2', field: 'PN_2', sortable: true },
        { name: 'Category', align: 'center', label: 'Category', field: 'category', sortable: true },
        { name: 'des', label: 'Progress', field: 'des' },
        { name: 'status', label: 'Status', field: 'status', sortable: true },
        { name: 'action', label: 'Action', field: 'action' },
      ],
      pagination: {
          rowsPerPage: 50
      }
    }
  },
  computed: {
    orderProgress: function () {
      const progressList = this.data.map(item => {
        return {
              'name': item.name,
              'des': item.des,
              'PN_1': item.PN_1,
              'PN_2': item.PN_2,
              'category': item.category,                
              'Progress': item.Progress,
              'status': item.status,
        }
      }
      );
      return progressList
  }
},
  methods: {
    getColor(val) {
      if (val > 70 && val <= 100) {
        return 'green'
      } else if (val > 50 && val <= 70) {
        return 'blue'
      }
      return 'teal'
    },

    start_work_order(work_order_name){
      const payload = {
        work_order_name: work_order_name,
        done_quantity: 0,
        status: 2
      }
      this.$store.dispatch('put_work_order', payload)
    },

    enable_work_order(work_order_name){
      const payload = {
        work_order_name: work_order_name,
        done_quantity: 0,
        status: 1,
        seq: 0
      }
      this.$store.dispatch('put_work_order', payload)
      const today_payload = {
        status: 1,
      }
      const history_payload = {
          status: 3,
      }  
      this.$store.dispatch('get_today_work_order', today_payload)  
      this.$store.dispatch('get_producing_work_order', today_payload) 
      this.$store.dispatch('get_history_work_order', history_payload)
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
          '历史工单' + getCurrentTime() + '.csv',
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

}
</script>

<style scoped>

</style>

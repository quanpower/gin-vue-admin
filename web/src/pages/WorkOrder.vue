
<template>
  <div class="q-pa-md">

    <q-table
      title="工单管理"
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
          <q-td v-if="props.row.status==1" :props="props">
              <q-btn icon="delete" color="red" label="删除" flat dense @click="delete_work_order(props.row.work_order_name)" />
          </q-td>
      </template>  

    </q-table>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="warning" text-color="white" />
          <span class="q-ml-sm">注意：请谨慎删除工单，只能删除还未打标生产过的工单！</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="确定" color="primary" @click="confirm_delete_work_order" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
  name: 'WorkOrder',
  data () {
    return {

      filter: '',
      mode:'list',
      confirm: false,
      work_order_name: '',

      columns: [
        { name: 'ID', align: 'center', label: 'ID', field: 'id', sortable: true },
        { name: 'WO', align: 'center', label: 'WO', field: 'work_order_name', sortable: true },
        { name: 'date', align: 'center', label: 'Date', field: 'create_time', sortable: true },
        { name: 'PN_1', align: 'center', label: 'PN_1', field: 'PN_1', sortable: true },
        { name: 'PN_2', align: 'center', label: 'PN_2', field: 'PN_2', sortable: true },
        { name: 'Category', align: 'center', label: 'Category', field: 'category', sortable: true },
        { name: 'ordered_quantity', align: 'center', label: 'ordered_quantity', field: 'ordered_quantity' },
        { name: 'done_quantity', align: 'center', label: 'done_quantity', field: 'done_quantity' },
        { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
        { name: 'action', align: 'center', label: 'Action', field: 'action' },
      ],   

        pagination: {
          rowsPerPage: 50
        }                 

    }
  },
  mounted() {
    this.$store.dispatch('get_all_work_order')
  },
  computed: {
    // 计算属性的 getter
    data: {
      get: function () {
        const all_work_orders = this.$store.state.work_order.all_work_orders

        console.log('---all_work_orders in vue----')
        console.log(all_work_orders)

        return all_work_orders
      }
    },

  },
  methods: {
    delete_work_order(work_order_name){
      const payload = {
        work_order_name: work_order_name,
      }
      this.confirm = true
      this.work_order_name = work_order_name

    },

    confirm_delete_work_order(){
      const payload = {
        work_order_name: this.work_order_name,
      }
      this.$store.dispatch('delete_work_order', payload)
      this.$store.dispatch('get_all_work_order')
      this.confirm = false
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
          '工单管理' + getCurrentTime() + '.csv',
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
  },
}
</script>

<style lang="sass" scoped>

</style>
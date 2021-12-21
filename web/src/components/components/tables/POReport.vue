<template>
  <div class="row q-col-gutter-sm q-py-sm">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <q-card class="text-grey-8">
          <q-card-section class="q-pa-none">
            <q-table class="no-shadow"
                     :data="data"
                     title="生产订单报表"
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

                <!-- <q-btn
                  color="primary"
                  icon-right="archive"
                  label="报表导出"
                  no-caps
                  @click="exportTable"
                /> -->
              </template>

              <template v-slot:body-cell-scan_result="props">
                <q-td :props="props">
                  <q-badge rounded class="q-mr-sm" :color="getColor(props.row.scan_result)"  />
                  <router-link :to="{path:'ScanReport', query:{data: props.row.scan_items}}">扫码详情</router-link>
                </q-td>
              </template>

              <template v-slot:body-cell-test_result="props">
                <q-td :props="props">
                  <q-badge rounded class="q-mr-sm" :color="getColor(props.row.test_result)"  />
                  <router-link :to="{path:'TestReport', query:{data: props.row.test_items}}">测试详情</router-link>
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
                  <q-chip class="float-right text-white text-capitalize" label="警告" color="warning"
                          v-if="props.row.status==3"></q-chip>
                  <q-chip class="float-right text-white text-capitalize" label="异常" color="negative"
                          v-if="props.row.status==-1"></q-chip>
                </q-td>
              </template>

            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </div>
</template>

<script>
// import {exportFile} from 'quasar'


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
export default {
  name: 'POReportItem',
  props: ['data'],


  data () {
    return {
      filter: '',
      mode:'list',
      columns: [
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

      ],
      
      pagination: {
          rowsPerPage: 30
      }
    }
  },
  methods: {
    getColor(value){
      if (value){
        return 'green'
      }
      else{
        return 'red'
      }
    },
  }
}
</script>

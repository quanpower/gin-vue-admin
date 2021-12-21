<template>
  <div class="row q-col-gutter-sm q-py-sm">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <q-card class="text-grey-8">
          <q-card-section class="q-pa-none">
            <q-table class="no-shadow"
                     :data="data"
                     title="扫码详情报表"
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

              <template v-slot:body-cell-result="props">
                <q-td :props="props">
                  <q-badge rounded class="q-mr-sm" :color="getColor(props.row.result)"  />
                </q-td>
              </template>

              <template v-slot:body-cell-bypass="props">
                <q-td :props="props">
                  <q-badge rounded class="q-mr-sm" :color="getColor(props.row.bypass)"  />
                </q-td>
              </template>

            </q-table>
          </q-card-section>
        </q-card>
      </div>
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
export default {
  name: 'ScanItem',
  props: ['data'],

  data () {
    return {
      filter: '',
      mode: 'list',
      // id:this.$route.query.id,
      // 目前所有值从PO report传过来，应该传参再获取更佳

      columns: [
        {name: 'task_name', align: 'left', label: '任务名', field: 'task_name', sortable: true},
        {name: 'part_name', align: 'left', label: '零件名', field: 'part_name', sortable: true},
        {name: 'part_pn', align: 'left', label: '零件PN', field: 'part_pn', sortable: true},
        {name: 'part_sn', align: 'left', label: '零件SN', field: 'part_sn', sortable: true},
        {name: 'result', align: 'left', label: '扫码结果', field: 'result', sortable: true},
        {name: 'bypass', align: 'left', label: '人工放行', field: 'bypass', sortable: true},
        {name: 'result_desp', align: 'center', label: '扫码描述', field: 'result_desp'},
      ],

      pagination: {
          rowsPerPage: 20
      }
    }
  },

  computed: {
    production_orders: {
      get: function () {
        const production_ordersTemp = this.$store.state.production_order.production_orders

        console.log('===production_ordersTemp====')
        console.log(production_ordersTemp)
        return production_ordersTemp
      }
    }
  },

  methods: {
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
          'table-export.csv',
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

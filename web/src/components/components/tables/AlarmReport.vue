<template>
  <q-card class="text-grey-8">
    <q-card-section class="q-pa-none">
      <q-table class="no-shadow"
                :data="data"
                title="报警记录表"
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

        <!-- <template v-slot:body-cell-alarm_level="props">
          <q-td :props="props">
            <q-chip class="float-right text-white text-capitalize" label="生产" color="green"
                    v-if="props.row.alarm_level==0"></q-chip>                
            <q-chip class="float-right text-white text-capitalize" label="轻微" color="warning"
                    v-if="props.row.alarm_level==1"></q-chip>
            <q-chip class="float-right text-white text-capitalize" label="中等" color="orange"
                    v-if="props.row.alarm_level==2"></q-chip>
            <q-chip class="float-right text-white text-capitalize" label="严重" color="negative"
                    v-if="props.row.alarm_level==3"></q-chip>
          </q-td>
        </template> -->

        <template v-slot:body-cell-bypass="props">
          <q-td :props="props">
            <q-badge rounded class="q-mr-sm" :color="getColor(props.row.bypass)"  />
          </q-td>
        </template>

      </q-table>
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
export default {
  name: 'Alarm',
  props: ['data'],

  data () {
    return {
      filter: '',
      mode:'list',
      columns: [
        {name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true},
        {name: 'date', align: 'left', label: '报警时间', field: 'date'},
        {name: 'production_order', align: 'left', label: '生产订单', field: 'production_order'},
        {name: 'alarm_code', align: 'left', label: '报警编码', field: 'alarm_code'},
        // {name: 'alarm_level', align: 'center', label: '报警等级', field: 'alarm_level'},
        {name: 'operation', align: 'left', label: '工位', field: 'operation'},
        {name: 'task_name', align: 'left', label: '任务名', field: 'task_name'},
        {name: 'alarm_message', align: 'left', label: '报警信息', field: 'alarm_message'},
        {name: 'reset_time', align: 'left', label: '清除时间', field: 'reset_time'},
        {name: 'alarm_duration', align: 'left', label: '持续时长', field: 'alarm_duration'},
        {name: 'process', align: 'left', label: '处理方式', field: 'process'},
        {name: 'alarm_desp', align: 'left', label: '报警描述', field: 'alarm_desp'},
      ],
      
      pagination: {
          rowsPerPage: 30
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

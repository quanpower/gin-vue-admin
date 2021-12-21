
<template>
  <div class="q-pa-md">

    <q-table
      title="生产状态监控"
      separator="cell"
      :data="tableData"
      :columns="columns"
      row-key="name"
      :visible-columns="visibleColumns"
    >
      <template v-slot:top >
        <div class="text-h6 text-indigo-8">
          实时状态
        </div>
        <div class="text-subtitle2">
          各工位实时状态，4个灯依次向下分别代表扫描NG，扫描OK，测试NG，测试OK。
        </div>

        <q-space />

        <q-select
          v-model="visibleColumns"
          multiple
          outlined
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          options-cover
          style="min-width: 150px"
        />
      </template>

      <template v-slot:body="props">
        <q-tr >
          <q-td key="PO" >
            <q-badge color="blue">
              {{ props.row.PO }}
            </q-badge>
          </q-td>

          <!-- v-for,v-if 连用，v-if 优先级高，循环生产表格 -->
          <template v-for="(value, name) in props.row" v-if="name !== 'PO'">
            <q-td :key="name" >
              <Indicator :colors="value"> </Indicator>
            </q-td>
          </template>

        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: 'Status',
  components: {
      Indicator: () =>  import('components/lights/Indicator'),
  },

  data () {
    return {
    }
  },
  mounted() {
    // const that=this;

    this.$store.dispatch('GetOperations')

    const payload = {
        // 生产中订单
        status: 2,
    }
    if (this.timer){
      clearInterval(this.timer)
    }else{
      this.timer = setInterval(() => {this.$store.dispatch('get_produce_production_order', payload)}, 1000)
    }

  },

  methods: {
    
  },
  computed: {
    // 计算属性的 getter

    visibleColumns: {
      get: function () {
        const operations = this.$store.state.operation.operations

        console.log('---operations in vue----')
        console.log(operations)

        const visibleColumnList = operations.map(item => {
            const operation_name = item.name
            // const operation_name = item.name.slice(2)
            return operation_name
        })

        return visibleColumnList
      }
    },  

    columns: {
      get: function () {
        const operations = this.$store.state.operation.operations

        console.log('---operations in vue----')
        console.log(operations)

        const column_list = operations.map(item => {
            const operation_name = item.name
            // const operation_name = item.name.slice(2)
            return {name: operation_name, label: operation_name, field: operation_name, align: 'center' }

        })
        
        const po = {
          name: 'PO',
          required: true,
          label: '生产订单号',
          align: 'center',
          field: row => row.PO,
          format: val => `${val}`,
          sortable: true
        }

        // 指定在索引0处插入PO信息
        column_list.splice(0, 0, po)

        return column_list
      }
    },

    tableData: {
      get: function () {
        const produce_production_orders = this.$store.state.production_order.produce_production_orders

        console.log('---produce_production_orders in vue----')
        console.log(produce_production_orders)

        const produce_production_order_list = produce_production_orders.map(item => {

            const production_order_name = item.production_order_name
            const scan_test_item = item.scan_test_item
            console.log(scan_test_item)

            const result_dict = {}

            scan_test_item.map(item=>{
              const operation = item.operation
              // console.log(operation)
              // console.log(item.scan_result)
              // console.log(item.test_result)
              
              const color_list = []

              // 添加扫描灯
              if (item.scan_result){
                color_list.push('grey')
                color_list.push('green')
              }
              else{
                color_list.push('red')
                color_list.push('grey')
              }
              // 添加测试灯 
              if (item.test_result){
                color_list.push('grey')
                color_list.push('green')
              }
              else{
                color_list.push('red')
                color_list.push('grey')
              }

              // 变量作为Key 
              result_dict[operation] = color_list
              
            })

            result_dict.PO = production_order_name
            console.log('=======scan_test_color======')
            console.log(result_dict)
            return result_dict

        })

        return produce_production_order_list
      }
    },
  },

  destroyed () {
      // 销毁监听
    clearInterval(this.timer)
  }
}
</script>

<style lang="sass" scoped>

</style>
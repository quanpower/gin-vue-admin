
<template>
  <div class="q-pa-md">

    <q-table
      title="生产状态监控"
      separator="cell"
      :data="tableData"
      :columns="columns"
      row-key="name"
      :pagination.sync="pagination"

    >
      <template v-slot:body-cell-scan_result="props">
        <q-td :props="props">
            <q-badge  class="q-mr-sm" :color="getColor(props.row.scan_result)"  />
        </q-td>
      </template>  

      <template v-slot:body-cell-test_result="props">
        <q-td :props="props">
            <q-badge  class="q-mr-sm" :color="getColor(props.row.test_result)"  />
        </q-td>
      </template>  


      <!-- 嵌入扫描表格 -->
      <template v-slot:body-cell-scan_task="props">
        <q-td :props="props">
          <q-table
            header: false
            hide-header
            hide-bottom
            dense
            separator="cell"
            :data="props.row.scan_task"
            :columns="scan_columns"
            row-key="id"
          >
            <template v-slot:body-cell-result="props">
              <q-td :props="props">
                  <q-badge  class="q-mr-sm" :color="getColor(props.row.result)"  />
              </q-td>
            </template>

          </q-table>
        </q-td>
      </template>

      <!-- 嵌入测试表格 -->
      <template v-slot:body-cell-test_task="props">
        <q-td :props="props">
            
          <q-table
            header: false
            hide-header
            hide-bottom
            dense
            separator="cell"
            :data="props.row.test_task"
            :columns="test_columns"
            row-key="id"
          >
            <template v-slot:body-cell-data="props">
              <q-td :props="props">
                <router-link :to="{path:'TestData', query:{data: props.row.data}}">数据详情</router-link>
              </q-td>
            </template>  

            <template v-slot:body-cell-result="props">
              <q-td :props="props">
                  <q-badge  class="q-mr-sm" :color="getColor(props.row.result)"  />
              </q-td>
            </template>              
          </q-table>
        </q-td>
      </template>

      <!-- 放行操作按钮 -->
      <template v-slot:body-cell-action="props">
          <q-td :props="props">
              <q-btn icon="play_arrow" color="blue" label="bypass" flat dense @click="bypassClick(props.row.production_order, props.row.operation_name, props.row.scan_task_name, props.row.test_task_name)" />
          </q-td>
      </template>


    </q-table>


    <q-dialog v-model="password_dialog.show">

        <q-card style="width: 600px" class="q-px-sm q-pb-md" v-if="password_dialog.show">
          <q-card-section>
            <div class="text-h6">
              线长权限
            </div>
          </q-card-section>

          <q-card-section class="q-pa-sm">
            <q-input dense class="q-mt-sm" v-model="adminPassword" type="password" hint="Password"  label="线长密码" outlined :rules="[val => !!val || 'Field is required']" />
          </q-card-section>

          <q-card-actions align="right" class="q-pa-sm text-grey-8">
            <!-- 添加任务 -->
            <q-btn label="确定" color="indigo-5" class="text-capitalize" @click="checkAdminPW()"> </q-btn>
            <q-btn label="取消" color="primary" class="text-capitalize" @click="password_dialog.show=false"></q-btn>
          </q-card-actions>

        </q-card>

    </q-dialog>

  </div>
</template>

<script>
export default {
  name: 'Status',
  data () {
    return {

      columns: [
          {name: 'operation_name', align: 'left', label: '工位', field: 'operation_name', sortable: true},
          {name: 'production_order', align: 'left', label: '生产订单号', field: 'production_order', sortable: true},
          {name: 'scan_result', align: 'center', label: '扫码结果', field: 'scan_result', sortable: true},
          {name: 'test_result', align: 'center', label: '测试结果', field: 'test_result', sortable: true},
          {name: 'scan_task', align: 'center', label: '扫码任务: 零件PN | 零件SN | 扫码结果', field: 'scan_task'},
          {name: 'test_task', align: 'center', label: '测试任务: 测试数据 | 测试结果', field: 'test_task'},
          {name: 'action', align: 'center', label: 'BYPASS', field: 'action' },
        ],
      scan_columns:[
          // {name: 'part_name', align: 'left', label: '零件名', field: 'part_name'},
          {name: 'part_pn', align: 'center', label: '零件PN', field: 'part_pn'},
          {name: 'part_sn', align: 'left', label: '零件SN', field: 'part_sn'},
          {name: 'result', align: 'left', label: '扫描结果', field: 'result'},
        ],
      test_columns:[
          {name: 'data', align: 'left', label: '测试数据', field: 'data'},
          {name: 'result', align: 'left', label: '测试结果', field: 'result'},
        ],
      pagination: {
          rowsPerPage: 30
      },
      adminPassword: '',
      password_dialog: {
          show: false,
          production_order_name: '',
          operation_name: '',
          scan_task_name: '',
          test_task_name: '',
      },
    }
  },
  mounted() {
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

  computed: {
    // 计算属性的 getter
    tableData: {
      get: function () {
        const produce_production_orders = this.$store.state.production_order.produce_production_orders

        // console.log('---produce_production_orders in vue----')
        // console.log(produce_production_orders)

        return produce_production_orders
      }
    },
    User: {
      get: function () {
        const data = this.$store.state.user.user
        return data
      }
    },

  },
  methods: {
    getColor(value){
      if (value){
        return 'green'
      }
      else{
        return 'grey'
      }
    },

    bypassClick: function(production_order_name, operation_name, scan_task_name, test_task_name){
      console.log('=========bypassClick========')
      // this.$set(this.password_dialog, 'show', true)
      if(this.User.email == 'line@line.com'||this.User.email == 'admin@admin.com'){
        this.bypass_this_operation_task(production_order_name, operation_name, scan_task_name, test_task_name)
      }else{
        alert('手动放行需要线长权限，请登录线长账号！')
      }

    }, 

    dialogChange: function(production_order_name, operation_name, scan_task_name, test_task_name){
      console.log('=========dialogChange========')
      // this.$set(this.password_dialog, 'show', true)
      this.$set(this.password_dialog, 'production_order_name', production_order_name)
      this.$set(this.password_dialog, 'operation_name', operation_name)
      this.$set(this.password_dialog, 'scan_task_name', scan_task_name)
      this.$set(this.password_dialog, 'test_task_name', test_task_name)
      this.checkAdminPW()
    }, 

    // 校验管理员密码，正确执行放行 
    checkAdminPW(){
      let payload = {
        username: 'line@line.com',
        password: this.adminPassword
      }

      this.$store.dispatch('CheckAdminPW', payload)
        .then(() => {
          this.bypass_this_operation_task(this.password_dialog.production_order_name, this.password_dialog.operation_name, this.password_dialog.scan_task_name, this.password_dialog.test_task_name)
          this.$set(this.password_dialog, 'show', false)
          this.adminPassword = ''
        })
        .catch(() => {
          alert('密码错误！')
          this.$set(this.password_dialog, 'show', false)
          this.adminPassword = ''
        })
    }, 

    bypass_this_operation_task(production_order_name, operation_name, scan_task_name, test_task_name){
      console.log('--bypass this operation task--')
      console.log(operation_name)
      // 该OP05未激光打标，停止后，直接放行，不做记录 
      if(operation_name == 'OP05' && production_order_name == 'OP05_placeholder'){
        // 强制启动线体，直接放行
        // this.$store.dispatch('start_enforce')
        console.log('start_enforce')
      }
      else{
        //TODO:放行修改停线时间 
        const scan_payload = {
            "production_order_name": production_order_name,
            "operation_name": operation_name,
            "task_name": scan_task_name,
            "part_name": "",
            "bar_type": 0,
            "rule": "",
            "part_pn": "",
            "part_sn": "",
            "result": false,
            "bypass": true,
            "result_desp": ""
        }

        const test_payload = {
            "production_order_name": production_order_name,
            "operation_name": operation_name,
            "task_name": test_task_name,
            "test_parameter": '',
            "data": '',
            "result": false,
            "bypass": true,
            "result_desp": '',
        }

        console.log(scan_payload)
        console.log(test_payload)
        
        if (scan_task_name){
          this.$store.dispatch('bypass_this_operation_scan_task', scan_payload)
            .then(() => {
              this.$q.notify({
                message: '提交成功！',
                color: 'green'
              })
            })
            .catch((error) => {
              this.$q.notify({
                message: '提交失败！'+error,
                color: 'red'
              })
            })
        }

        if (test_task_name){
          this.$store.dispatch('bypass_this_operation_test_task', test_payload)
            .then(() => {
              this.$q.notify({
                message: '提交成功！',
                color: 'green'
              })
            })
            .catch((error) => {
              this.$q.notify({
                message: '提交失败！'+error,
                color: 'red'
              })
            })
        }
      }
    } 

  },

  destroyed () {
      // 销毁监听
    clearInterval(this.timer)
  },
}
</script>

<style lang="sass" scoped>

</style>
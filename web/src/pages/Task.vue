
<template>
  <div class="q-pa-md">
    <q-table
      title="任务管理"
      separator="cell"
      :data="Data"
      :columns="columns"
      row-key="name"
      :pagination.sync="pagination"

    >
      <template v-slot:body-cell-Action="props">
        <q-td :props="props">
          <q-btn icon="edit" color="blue" label="编辑" flat dense @click="edit_task(props.row)" />
        </q-td>
      </template>      

    </q-table>
    

    <q-dialog v-model="new_dialog.show">

        <q-card style="width: 600px" class="q-px-sm q-pb-md">
          <q-card-section>
            <div class="text-h6">
              新增
            </div>
          </q-card-section>

          <q-card-section class="q-pa-sm">
            <q-input dense v-model="add_data.name" label="任务名 *" outlined :rules="[val => !!val || 'Field is required']" />
            <q-select dense outlined v-model="add_data.type" :options="task_type_options" label="任务类型 *" />
            <q-select dense outlined v-model="add_data.operation_name" :options="operationOptions" label="工位名 *" />
            <q-select dense outlined v-model="add_data.device_name" :options="deviceOptions" label="设备名 *" />
            <q-input dense class="q-mt-sm" v-model="add_data.description" label="桥类描述，可选" outlined/>
          </q-card-section>

          <q-card-actions align="right" class="q-pa-sm text-grey-8">
            <!-- 添加任务 -->
            <q-btn label="确定" color="indigo-5" class="text-capitalize" @click="createNew()"> </q-btn>
            <q-btn label="取消" color="primary" class="text-capitalize" @click="new_dialog.show=false"></q-btn>
          </q-card-actions>

        </q-card>

    </q-dialog>

    <q-dialog v-model="edit_dialog.show">

        <q-card style="width: 600px" class="q-px-sm q-pb-md">
          <q-card-section>
            <div class="text-h6">
              编辑
            </div>
          </q-card-section>
          <!-- 修改扫码，调换扫码枪设备，修改测试项，调换工位 -->
          <q-card-section class="q-pa-sm">
            <q-input dense disable readonly v-model="edit_data.name" label="任务名 *" outlined :rules="[val => !!val || 'Field is required']" />
            <q-select dense disable readonly outlined v-model="edit_data.type" :options="task_type_options" label="任务类型 *" />
            <q-select dense outlined v-model="edit_data.operation_name" :options="operationOptions" label="工位名 *" />
            <q-select dense outlined v-model="edit_data.device_name" :options="deviceOptions" label="设备名 *" />
            <q-input dense class="q-mt-sm" v-model="edit_data.description" label="桥类描述，可选" outlined/>
          </q-card-section>

          <q-card-actions align="right" class="q-pa-sm text-grey-8">
            <!-- 添加任务 -->
            <q-btn label="确定" color="indigo-5" class="text-capitalize" @click="updateTask()"> </q-btn>
            <q-btn label="取消" color="primary" class="text-capitalize" @click="edit_dialog.show=false"></q-btn>
          </q-card-actions>

        </q-card>

    </q-dialog>

    <!-- 添加任务 -->
    <div class="q-gutter-md row">
        <q-btn icon="add" rounded flat label="新增" @click="dialogChange()" />
    </div>
  </div>
</template>


<script>
export default {
  name: 'Tasks',
  data () {
    return {
        columns: [
          {name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true},
          {name: 'name', align: 'left', label: '任务名', field: 'name', sortable: true},
          {name: 'type', align: 'center', label: '任务类型', field: 'type'},
          {name: 'operation_name', align: 'center', label: '工位', field: 'operation_name'},
          {name: 'device_name', align: 'center', label: '设备', field: 'device_name'},
          {name: 'description', align: 'center', label: '描述', field: 'description'},
          {name: 'Action', label: '操作', field: 'action', sortable: false, align: 'center'},             
        ],

        new_dialog: {
            show: false,
        },
        edit_dialog: {
            show: false,
        },

        add_data: {
            name: '',
            type: 1,
            operation_name: '',
            device_name: '',
            description: ''
        }, 

        edit_data: {
            name: '',
            type: 1,
            operation_name: '',
            device_name: '',
            description: ''
        }, 

        task_type_options: [
          {
            label: '无动作',
            value: 0
          },
          {
            label: '扫码任务',
            value: 1
          },
          {
            label: '测试任务',
            value: 2
          }          
        ],      

        pagination: {
          rowsPerPage: 50
        }          
    }
  },
  mounted() {
    this.$store.dispatch('GetTasks')
    this.$store.dispatch('GetDevices')
    this.$store.dispatch('GetOperations')
  },

  methods: {
    dialogChange: function(){
      console.log('=========dialogChange========')

      this.$set(this.new_dialog, 'show', true)
    },    

    createNew: function(){
      console.log('=========createNew========')

      const payload = {
        name: this.add_data.name,
        type: this.add_data.type,
        operation_name: this.add_data.operation_name.label,
        device_name: this.add_data.device_name.label,
        description: this.add_data.description,
      }

      console.log(payload)


      this.$store.dispatch('CreateTask', payload)
        .then(() => {
          this.$q.notify({
            message: '提交成功！',
            color: 'green'
          })
        })
        .catch(() => {
          this.$q.notify({
            message: '提交失败！',
            color: 'red'
          })
        })       
      this.$set(this.new_dialog, 'show', false)
      // 获取最新全部桥类
      this.$store.dispatch('GetTasks')

    },  
    
    edit_task: function(row){
      console.log('=========updateTask========')
      this.$set(this.edit_dialog, 'show', true)

      this.$set(this.edit_data, 'name', row.name)
      this.$set(this.edit_data, 'type', row.type)
      this.$set(this.edit_data, 'operation_name', row.operation_name)
      this.$set(this.edit_data, 'device_name', row.device_name)
      this.$set(this.edit_data, 'description', row.description)

      console.log(this.edit_data)

    },  

    updateTask: function(){
      console.log('=========updateTask========')

      const payload = {
        name: this.edit_data.name,
        type: this.edit_data.type,
        // select 特殊处理，无选择动作时候需要有个默认值，因为这时候无label,会报错！
        operation_name: this.edit_data.operation_name.label?this.edit_data.operation_name.label:this.edit_data.operation_name,
        device_name: this.edit_data.device_name.label?this.edit_data.device_name.label:this.edit_data.device_name,
        description: this.edit_data.description,
      }

      console.log(this.edit_data)
      console.log(payload)

      this.$store.dispatch('UpdateTask', payload)
        .then(() => {
          this.$q.notify({
            message: '提交成功！',
            color: 'green'
          })
        })
        .catch(() => {
          this.$q.notify({
            message: '提交失败！',
            color: 'red'
          })
        })       

      this.$set(this.edit_dialog, 'show', false)
      // 获取最新全部设备
      this.$store.dispatch('GetTasks')

    },  
    

  },
  computed: {
    // 计算属性的 getter
    Data: {
      get: function () {
        const data = this.$store.state.task.tasks

        return data
      }
    },

    operationOptions: {
      get: function () {
        const operationTemp = this.$store.state.operation.operations
        let operationNameList = []
        for (const item of operationTemp)
          {
            operationNameList.push(
              {
                label: item.name,
                value: item.name,
              })
          }
        console.log('=====operationNameList====')
        console.log(operationNameList)
        return operationNameList
      }
    },
          
    deviceOptions: {
      get: function () {
        const deviceTemp = this.$store.state.device.devices
        let deviceNameList = []
        for (const item of deviceTemp)
          {
            deviceNameList.push(              
              {
                label: item.name,
                value: item.name,
              })
          }
        console.log('=====deviceNameList====')
        console.log(deviceNameList)
        return deviceNameList
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
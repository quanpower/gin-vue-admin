
<template>
  <div class="q-pa-md">

    <q-table
      title="设备管理"
      separator="cell"
      :data="deviceData"
      :columns="device_columns"
      row-key="name"
      :pagination.sync="pagination"

    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
            <q-badge  class="q-mr-sm" :color="getColor(props.row.status)"  />
        </q-td>
      </template>  

      <template v-slot:body-cell-Action="props">
        <q-td :props="props">
          <q-btn icon="edit" color="blue" label="编辑" flat dense @click="edit_device(props.row)" />
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
            <q-input dense v-model="add_data.name" label="设备名 *" outlined :rules="[val => !!val || 'Field is required']" />
            <q-input dense v-model="add_data.device_ip" label="设备IP *" mask="###.###.##.##" hint="Mask: ###.###.##.##" outlined :rules="[val => !!val || 'Field is required']" />
            <q-input dense class="q-mt-sm" v-model="add_data.description" label="设备描述，可选" outlined />
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

          <q-card-section class="q-pa-sm">
            <q-input dense disable readonly v-model="edit_data.name" label="设备名 *" outlined :rules="[val => !!val || 'Field is required']" />
            <q-input dense v-model="edit_data.device_ip" label="设备IP *" mask="###.###.##.##" hint="Mask: ###.###.##.##" outlined :rules="[val => !!val || 'Field is required']" />
            <q-input dense class="q-mt-sm" v-model="edit_data.description" label="设备描述，可选" outlined />
          </q-card-section>

          <q-card-actions align="right" class="q-pa-sm text-grey-8">
            <!-- 添加任务 -->
            <q-btn label="确定" color="indigo-5" class="text-capitalize" @click="updateDevice()"> </q-btn>
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
  name: 'Device',
  data () {
    return {

        device_columns: [
          {name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true},
          {name: 'name', align: 'left', label: '设备名', field: 'name', sortable: true},
          {name: 'device_ip', align: 'left', label: '设备IP', field: 'device_ip', sortable: true},
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
            device_ip: '',
            description: ''
        },     
        edit_data: {
            name: '',
            device_ip: '',
            description: ''
        },             
        pagination: {
            rowsPerPage: 50
        }, 

    }
  },
  mounted() {
    this.$store.dispatch('GetDevices')
  },

  computed: {
    // 计算属性的 getter
    deviceData: {
      get: function () {
        const devices = this.$store.state.device.devices

        console.log('---devices in vue----')
        console.log(devices)

        return devices.slice(1)
      }
    },

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
        device_ip: this.add_data.device_ip,
        status: false,
        description: this.add_data.description,
      }

      this.$store.dispatch('CreateDevice', payload)
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
      // 获取最新全部设备
      this.$store.dispatch('GetDevices')

    },    

    edit_device: function(row){
      console.log('=========edit_device========')
      this.$set(this.edit_dialog, 'show', true)

      this.$set(this.edit_data, 'name', row.name)
      this.$set(this.edit_data, 'device_ip', row.device_ip)
      this.$set(this.edit_data, 'description', row.description)

    },  

    updateDevice: function(){
      console.log('=========updateDevice========')

      const payload = {
        name: this.edit_data.name,
        device_ip: this.edit_data.device_ip,
        status: false,
        description: this.edit_data.description,
      }

      this.$store.dispatch('UpdateDevice', payload)
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
      this.$store.dispatch('GetDevices')

    },  

    getColor(value){
      if (value){
        return 'green'
      }
      else{
        return 'red'
      }
    }, 
            
  },
  destroyed () {
      // 销毁监听
    // clearInterval(this.timer)
  },
}
</script>

<style lang="sass" scoped>

</style>

<template>
  <div class="q-pa-md">

    <q-table
      title="设备状态监控"
      separator="cell"
      :data="statusData"
      :columns="device_columns"
      row-key="name"
      :pagination.sync="pagination"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
            <q-badge  class="q-mr-sm" :color="getColor(props.row.status)"  />
        </q-td>
      </template>  

    </q-table>


    <q-table
      title="PLC状态监控"
      separator="cell"
      :data="plcData"
      :columns="plc_columns"
      row-key="name"
      :pagination.sync="pagination"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
            <q-badge  class="q-mr-sm" :color="getColor(props.row.status)"  />
        </q-td>
      </template>  

    </q-table>
    
  </div>
</template>

<script>

import mqtt from 'mqtt'

export default {
  name: 'DeviceStatus',
  data () {
    return {
      statusData: [],
      plcData: [],
      pagination: {
        rowsPerPage: 30
      },

      device_columns: [
        {name: 'name', align: 'left', label: '设备名', field: 'name', sortable: true},
        {name: 'device_ip', align: 'left', label: '设备IP', field: 'device_ip', sortable: true},
        {name: 'status', align: 'center', label: '设备状态', field: 'status', sortable: true},
        {name: 'description', align: 'center', label: '描述', field: 'description'},
      ],
      plc_columns:[
        {name: 'name', align: 'left', label: 'IO名', field: 'name', sortable: true},
        {name: 'address', align: 'left', label: 'IO地址', field: 'address', sortable: true},
        {name: 'status', align: 'center', label: '设备状态', field: 'status', sortable: true},
        {name: 'description', align: 'center', label: '描述', field: 'description'},
      ],

      connection: {
        host: this.$store.state.app.wsl_host,
        port: 8083,
        endpoint: '/mqtt',
        clean: true, // 保留会话
        connectTimeout: 4000, // 超时时间
        reconnectPeriod: 4000, // 重连时间间隔
        // 认证信息
        clientId: 'mqttjs_status' + Math.random().toString(16).substr(2, 8),
        username: 'emqx_test',
        password: 'emqx_test',
      },
      subscription: {
        topic: 'status/#',
        qos: 0,
      },
      publication: {
        topic: 'status/111',
        qos: 0,
        payload: '{ "msg": "Hello, I am browser." }',
      },        

    }
  },
  mounted() {
    // const payload = {
    //     // 生产中订单
    //     status: 2,
    // }
    // if (this.timer){
    //   clearInterval(this.timer)
    // }else{
    //   this.timer = setInterval(() => {this.$store.dispatch('GetDevices')}, 1000)
    // }
    this.createConnection()
    this.doSubscribe()    
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


    // plcData: {
    //   get: function () {
    //     const plc = [
    //       {'name':'RFID触发', 'address':'DB100.30.0','status':false,'description':''},
    //       {'name':'op_20_atlas', 'address':'DB100.30.1','status':false,'description':''},
    //       {'name':'op40_L_atlas', 'address':'DB100.30.3','status':false,'description':''},
    //       {'name':'op40_R_atlas', 'address':'DB100.30.2','status':false,'description':''},
    //       {'name':'op70_L_matou', 'address':'DB100.30.5','status':false,'description':''},
    //       {'name':'op70_R_matou', 'address':'DB100.30.4','status':false,'description':''},
    //       {'name':'op80_L_atlas', 'address':'DB100.30.6','status':false,'description':''},
    //       {'name':'op80_R_atlas', 'address':'DB100.30.7','status':false,'description':''},

    //     ]

    //     console.log('---plc in vue----')
    //     console.log(plc)

    //     return plc
    //   }
    // },
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
    // 创建连接
    createConnection() {
      // 连接字符串, 通过协议指定使用的连接方式
      // ws 未加密 WebSocket 连接
      // wss 加密 WebSocket 连接
      // mqtt 未加密 TCP 连接
      // mqtts 加密 TCP 连接
      // wxs 微信小程序连接
      // alis 支付宝小程序连接
      const { host, port, endpoint, ...options } = this.connection
      const connectUrl = `ws://${host}:${port}${endpoint}`
      try {
        this.client = mqtt.connect(connectUrl, options)
      } catch (error) {
        console.log('mqtt.connect error', error)
      }

      this.client.on('connect', () => {
        console.log('Connection succeeded!')
      })

      this.client.on('error', error => {
        console.log('Connection failed', error)
      })

      this.client.on('message', (topic, message) => {
        // console.log(`Received message ${message} from topic ${topic}`)
        console.log(topic)

        const msg = JSON.parse(message)

        if(topic == 'status/device'){
          console.log(msg)
          this.updateStatus(msg)
        }
        else if(topic == 'status/plc'){
          console.log(msg)
          this.updatePLC(msg)
        }

        // this.$set(this.status, device_status)
      })
    },
    doSubscribe() {
      const { topic, qos } = this.subscription
      this.client.subscribe(topic, qos, (error, res) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        this.subscribeSuccess = true
        console.log('Subscribe to topics res', res)
        })
    },
    doUnSubscribe() {
      const { topic } = this.subscription
      this.client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
        }
      })
    },   
    doPublish() {
      const { topic, qos, payload } = this.publication
      this.client.publish(topic, payload, qos, error => {
        if (error) {
          console.log('Publish error', error)
        }
      })
    }, 
    destroyConnection() {
      if (this.client.connected) {
        try {
          this.client.end()
          this.client = {
            connected: false,
          }
          console.log('Successfully disconnected!')
        } catch (error) {
          console.log('Disconnect failed', error.toString())
        }
      }
    },
    
    handleclick: function() {
      this.doPublish();
    },  
    
    updateStatus: function(msg) {
      // 清空原数组
      this.statusData.splice(0, this.statusData.length)
      for (const msg_dict of msg){
        // 插入新数组
        this.statusData.push(msg_dict)
      }
    },  

    updatePLC: function(msg) {
      // 清空原数组
      this.plcData.splice(0, this.plcData.length)
      for (const msg_dict of msg){
        // 插入新数组
        this.plcData.push(msg_dict)
      }
    }      

  },

  destroyed () {
      // 销毁监听
    // clearInterval(this.timer)
    this.destroyConnection()      
  },
  
}
</script>

<style lang="sass" scoped>

</style>
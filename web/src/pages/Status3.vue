
<template>
  <div class="q-pa-md">
    <q-table
      title="生产状态监控"
      separator="cell"
      :data="tableData"
      :columns="columns"
      row-key="sn"
    >
      <template v-slot:body="props">
        <q-tr >
          <q-td key="sn" >
            <q-badge color="teal">
              {{ props.row.SN }}
            </q-badge>
          </q-td>

          <!-- v-for,v-if 连用，v-if 优先级高，循环生产表格 -->
          <template v-for="(value, name) in props.row" v-if="name !== 'SN'">
            <q-td :key="name" >
              <div class="row">
                <div class="col">
                  <Indicator :colors="value.left"> </Indicator>
                </div>
                <div class="col">
                  <Indicator :colors="value.right"> </Indicator>
                </div>
              </div>
            </q-td>
          </template>

        </q-tr>
      </template>
    </q-table>
  <!-- <q-btn class="text-capitalize bg-info text-white" @click="doPublish()">doPublish </q-btn> -->

  </div>

</template>


<script>

import mqtt from 'mqtt'

export default {
  
  name: 'Status',
  components: {
      Indicator: () =>  import('components/lights/Indicator'),
  },

  data () {
    return {
      connection: {
        host: '172.31.213.163',
        port: 8083,
        endpoint: '/mqtt',
        clean: true, // 保留会话
        connectTimeout: 4000, // 超时时间
        reconnectPeriod: 4000, // 重连时间间隔
        // 认证信息
        clientId: 'mqttjs_3be2c321',
        username: 'emqx_test',
        password: 'emqx_test',
      },
      subscription: {
        topic: 'device/#',
        qos: 0,
      },
      publication: {
        topic: 'device/111',
        qos: 0,
        payload: '{ "msg": "Hello, I am browser." }',
      },
      receiveNews: '',
      qosList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 },
      ],
      client: {
        connected: false,
      },
      subscribeSuccess: false,

      columns: [
        {
          name: 'sn',
          required: true,
          label: '序列号',
          align: 'center',
          field: row => row.sn,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'op05', label: 'OP05', field: 'op05', align: 'center' },
        { name: 'op10', label: 'OP10', field: 'op10', align: 'center' },
        { name: 'op20', label: 'OP20', field: 'op20', align: 'center' },
        { name: 'op30', label: 'OP30', field: 'op30',align: 'center' },
        { name: 'op40', label: 'OP40', field: 'op40',align: 'center' },
        { name: 'op50', label: 'OP50', field: 'op50',align: 'center' },
        { name: 'op60', label: 'OP60', field: 'op60',align: 'center' },
        { name: 'op70', label: 'OP70', field: 'op70',align: 'center' },
        { name: 'op80', label: 'OP80', field: 'op80',align: 'center' },
        { name: 'op90', label: 'OP90', field: 'op90',align: 'center' },
        { name: 'op100', label: 'OP100', field: 'op100',align: 'center' }
      ],

      tableDataInit: [
        {
          SN: 'VJ1912007B-1',
          op10: {left:['grey','green','grey','grey'],right:['red','grey','grey','grey']},
          op20: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op30: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op40: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op50: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op60: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op70: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op80: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op90: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op100: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
        },
        {
          SN: 'VJ1912007B-1',
          op10: {left:['grey','green','grey','grey'],right:['grey','green','grey','grey']},
          op20: {left:['grey','green','grey','grey'],right:['grey','green','grey','grey']},
          op30: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op40: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op50: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op60: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op70: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op80: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op90: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op100: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
        },
        {
          SN: 'VJ1912007B-1',
          op10: {left:['grey','green','grey','grey'],right:['grey','green','grey','grey']},
          op20: {left:['grey','green','grey','grey'],right:['grey','green','grey','grey']},
          op30: {left:['grey','green','grey','grey'],right:['grey','green','grey','grey']},
          op40: {left:['grey','green','grey','grey'],right:['grey','green','grey','grey']},
          op50: {left:['grey','green','grey','grey'],right:['grey','green','grey','grey']},
          op60: {left:['grey','green','grey','grey'],right:['grey','green','grey','grey']},
          op70: {left:['grey','green','grey','grey'],right:['grey','green','grey','grey']},
          op80: {left:['grey','green','grey','grey'],right:['grey','green','grey','grey']},
          op90: {left:['grey','green','grey','grey'],right:['grey','green','grey','grey']},
          op100: {left:['grey','green','grey','grey'],right:['grey','green','grey','grey']},
        },           
        {
          SN: 'VJ1912007B-1',
          op10: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op20: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op30: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op40: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op50: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op60: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op70: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op80: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op90: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op100: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
        },
        {
          SN: 'VJ1912007B-1',
          op10: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op20: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op30: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op40: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op50: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op60: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op70: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op80: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op90: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op100: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
        },
        {
          SN: 'VJ1912007B-1',
          op10: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op20: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op30: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op40: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op50: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op60: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op70: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op80: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op90: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
          op100: {left:['grey','grey','grey','grey'],right:['grey','grey','grey','grey']},
        },               
      ]
    }
  },
  mounted() {
    this.createConnection()
    this.doSubscribe()
  },

  methods: {
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
        this.receiveNews = message
        console.log(`Received message ${message} from topic ${topic}`)
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
    }
  },
  computed: {
    // 计算属性的 getter
    tableData: function () {
      // `this` 指向 vm 实例
      if (this.receiveNews){
        console.log('==this.receiveNews===')
        console.log(this.receiveNews)
        let json_dict = JSON.parse(this.receiveNews)
        console.log('====json_dict=====')
        console.log(json_dict)
        for( let key in json_dict ){
            //遍历对象属性
            console.log(key)
            //遍历对象属性值
            console.log(json_dict[key])
            this.tableDataInit[0][key] = json_dict[key]
          }
        
      }

      console.log('====tableDataInit=====')
      console.log(this.tableDataInit)

      return this.tableDataInit; 
    }
  },
  destroyed () {
      // 销毁监听
      this.destroyConnection()
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 50px
</style>
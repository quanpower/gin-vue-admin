
<template>
  <div class="q-pa-md">
    <q-card>

      <q-card-section>
        <div class="text-h6 text-indigo-8">
          Socket通信测试
        </div>
        <div class="text-subtitle2">
          所有现场Socket通信设备通信内容转发到此文本框
        </div>
        <div class="q-pa-md" style="height:600px, max-width: 600px">
          <q-input
            v-model="text"
            filled
            type="textarea"
            clearable
            clear-icon="close"
          />
        </div>
      </q-card-section>

      <q-separator />  

      <q-card-section>
        <div class="text-h6 text-indigo-8">
          PLC控制
        </div>

        <div class="q-pa-md" style="height:600px, max-width: 600px">
          <q-btn color="secondary" label="线体启动" @click="doPublish" />
        </div>

        <q-space />

        <div class="q-pa-md" style="height:600px, max-width: 600px">
          <q-input outlined v-model="speed" label="线体速度" dense />
          <q-btn color="secondary" label="设定" @click="setSpeed" />
        </div>
      </q-card-section>

      <q-separator />  

      <!-- <q-card-section>
        <div class="text-h6 text-indigo-8">
          工控机通信测试
        </div>
        <div class="text-subtitle2">
          读写数据库
        </div>
      </q-card-section> -->

      <q-separator />
<!-- 
      <q-card-section>
        <div class="text-h6 text-indigo-8">
          PLC通信测试
        </div>
        <div class="text-subtitle2">
          PLC读写测试
        </div>
      </q-card-section> -->

    </q-card>

  </div>
</template>

<script>
import mqtt from 'mqtt'

export default {
  name: 'Status',
  data () {
    return {

      connection: {
        host: this.$store.state.app.wsl_host,
        port: 8083,
        endpoint: '/mqtt',
        clean: true, // 保留会话
        connectTimeout: 4000, // 超时时间
        reconnectPeriod: 4000, // 重连时间间隔
        // 认证信息
        clientId: 'mqttjs_comtest',
        username: 'emqx_test',
        password: 'emqx_test',
      },
      subscription: {
        topic: 'device/#',
        qos: 0,
      },

      publication: {
        topic: 'xianti',
        qos: 0,
        payload: 'start',
      },

      receiveNews: '',

      // path: 'ws://127.0.0.1:8010/ws/device',
      text: "",
      speed: "",
    }
  },

  mounted() {
    this.createConnection()
    this.doSubscribe()
  },

  methods: {
      // init: function () {
      //     if(typeof(WebSocket) === "undefined"){
      //         alert("您的浏览器不支持socket")
      //     }else{
      //         // 实例化socket
      //         this.socket = new WebSocket(this.path)
      //         // 监听socket连接
      //         this.socket.onopen = this.open
      //         // 监听socket错误信息
      //         this.socket.onerror = this.error
      //         // 监听socket消息
      //         this.socket.onmessage = this.getMessage
      //     }
      // },
      // open: function () {
      //     console.log("socket连接成功")
      // },
      // error: function () {
      //     console.log("连接错误")
      // },
      // getMessage: function (msg) {
      //     console.log(msg.data)
      //     this.text = this.text + '\n'+ msg.data
      // },
      // send: function () {
      //     this.socket.send(params)
      // },
      // close: function () {
      //     console.log("socket已经关闭")
      // },
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
        // this.text = this.text + '\n' + message
        if(this.text.length >100){
          let tempStr = this.text + message
          this.text = tempStr.substring(tempStr.length-100) 
          }
        else{
          this.text = this.text + message
        }
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

    setSpeed() {
      let speed_payload = {
        topic: 'xianti',
        qos: 0,
        payload: 'speed,' + this.speed,
      }

      const { topic, qos, payload } = speed_payload
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

  },

  destroyed () {
      // 销毁监听
      this.destroyConnection()      
  },
}
</script>

<style lang="sass" scoped>

</style>
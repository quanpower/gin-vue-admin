<template>
  <div id="cards">

    <div
      class="card-item"
      v-for="(card, i) in cards"
      :key="card.title"
      >
      
      <div class="card-header">
        <div class="card-header-left">{{ card.title }}</div>
        <div class="card-header-right">{{ '0' + (i + 1) }}</div>
      </div>
      <!-- <dv-charts class="ring-charts" :option="card.config" /> -->
      
      <div align="center">
        <!-- <q-chip>
        <q-avatar icon="bookmark" color="green" text-color="white" />
        工作正常
      </q-chip> -->
         <!-- <q-img
          :src="card.imgSrc"
          :ratio="16/9"
        /> -->
        <q-avatar square>
          <img :src="card.imgSrc">
        </q-avatar>
      </div>

      <bar-chart :data="card.data" class="ring-charts" />

      <div class="card-footer">
        <div class="card-footer-item">
          <div class="footer-title">主板报警</div>
          <div class="footer-detail">
            <!-- <q-btn :color="card.boardAlarm" /> -->
            <q-btn :color="card.boardAlarm" />
          </div>
        </div>

        <div class="card-footer-item">
          <div class="footer-title">电流报警</div>
          <div class="footer-detail">
            <q-btn :color="card.currentAlarm" />
          </div>
        </div>
      </div>

    </div>
  <div>

  <scroll-board />

  </div>
  </div>
</template>

<script>
import mqtt from 'mqtt'
import scrollBoard from './scrollBoard'
import BarChart from './BarChart'

var str = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
function generateMixed(n) {
   var res = "";
   for(var i = 0; i < n ; i ++) {
     var id = Math.ceil(Math.random()*35);
     res += str[id];
   }
   return res;
}

export default {
  name: 'Cards',
  components: {
      scrollBoard,
      BarChart
    },

  data () {
    return {
      statusData: [],
      msg: {"转速1":3000,"转速2":3060,"转速3":3060,"绿灯":false,"急停开关":false,"消音复位按钮":false,"故障报警1":false,"故障报警2":false,"故障报警3":false,"光感信号1":true,"光感信号2":true,"光感信号3":true,"外部启停1":false,"外部启停2":false,"外部启停3":false,"外部急停":true,"红灯":false,"黄灯":false,"蜂鸣器":false,"1#喷射":true,"2#喷射":true,"3#喷射":true,"1#电机":true,"2#电机":true,"3#电机":true,"喷头时间报警":false,"主板时间报警":false,"喷嘴时间报警":false,"过滤器时间报警":false,"维护时间报警":false,"远程本地":true,"单动联动":false,"电流低报1":false,"电流低报2":false,"电流低报3":false,"电压低报1":false,"电压低报2":false,"电压低报3":false,"转速1低报":false,"转速2低报":false,"转速3低报":false,"功率低报1":false,"功率低报2":false,"功率低报3":false,"电流高报1":false,"电流高报2":false,"电流高报3":false,"电压高报1":false,"电压高报2":false,"电压高报3":false,"转速1高报":false,"转速2高报":false,"转速3高报":false,"功率高报1":true,"功率高报2":false,"功率高报3":false,"气压传感器低报":false,"气压传感器高报":false,"外部急停报警":false,"光感报警1":false,"光感报警2":false,"光感报警3":false,"光感使能":true,"1#电流":6.3411455154418945,"2#电流":6.204065799713135,"3#电流":6.485459804534912,"1#电压":215.20181274414062,"2#电压":215.10235595703125,"3#电压":221.76649475097656,"气压传感器":0.19739578664302826,"功率1":1364.6259765625,"功率2":1334.5091552734375,"功率3":1438.2576904296875,"运行时间":7.166666507720947,"喷头维护时间":1000,"主板维护时间":1000,"喷嘴维护时间":1000,"过滤器维护时间":1000,"故障时间":3.7666666507720947,"本次运行时间":66,"控制按钮1":true,"控制按钮2":true,"控制按钮3":true,"喷射按钮1":false,"喷射按钮2":false,"喷射按钮3":false},

      // MQTT
      connection: {
        host: '1.15.47.30',
        port: 8083,
        endpoint: '/mqtt',
        clean: true, // 保留会话
        connectTimeout: 4000, // 超时时间
        reconnectPeriod: 4000, // 重连时间间隔
        // 认证信息
        clientId: 'mqttjs_' + generateMixed(8),
        username: 'emqx_test',
        password: 'emqx_test',
      },
      subscription: {
        topic: 'devices/#',
        qos: 0,
      },
      publication: {
        topic: 'devices/111',
        qos: 0,
        payload: '{ "msg": "Hello, I am browser." }',
      }, 

    }
  },

  mounted() {
    this.createConnection()
    this.doSubscribe()    
  },

  computed: {
    cards: {
      get: function () {
        console.log('--------cards----')

        const voltage_1 = (this.msg['1#电压']*0.01).toFixed(2)
        const voltage_2 = (this.msg['2#电压']*0.01).toFixed(2)
        const voltage_3 = (this.msg['3#电压']*0.01).toFixed(2)

        const current_1 = this.msg['1#电流'].toFixed(2)
        const current_2 = this.msg['2#电流'].toFixed(2)
        const current_3 = this.msg['3#电流'].toFixed(2)

        const power_1 = (this.msg['功率1']*0.001).toFixed(2)
        const power_2 = (this.msg['功率2']*0.001).toFixed(2)
        const power_3 = (this.msg['功率3']*0.001).toFixed(2)

        const speed_1 = (this.msg['转速1']*0.001).toFixed(2)
        const speed_2 = (this.msg['转速2']*0.001).toFixed(2)
        const speed_3 = (this.msg['转速3']*0.001).toFixed(2)

        const red = this.msg['红灯']
        const green = this.msg['绿灯']
        const yellow = this.msg['黄灯']


        const cards = [
          {
            title:'设备1',
            imgSrc: this.getAvatarString('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg001.hc360.cn%2Fy5%2FM00%2F11%2FA0%2FwKhQUVXi9JGEGUeXAAAAAG_rpQY269.jpg&refer=http%3A%2F%2Fimg001.hc360.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636778684&t=9b60a64cd2f3ec0c2f1a523969dac81c'),
            data: [
              {
                value: voltage_1,
                itemStyle: {
                  color: '#ff0080'
                }
              },
              {
                value: current_1,
                itemStyle: {
                  color: '#5470C6'
                }
              },
              {
                value: power_1,
                itemStyle: {
                  color: '#91CC75'
                }
              },
              {
                value: speed_1,
                itemStyle: {
                  color: '#EE6666'
                }
              },                                          
            ],
            boardAlarm: this.getColor(this.msg['故障报警1']),
            currentAlarm: this.getColor(this.msg['电流低报1'] || this.msg['电流高报1']),
          },
          {
            title:'设备2',
            imgSrc: this.getAvatarString('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg001.hc360.cn%2Fy5%2FM00%2F11%2FA0%2FwKhQUVXi9JGEGUeXAAAAAG_rpQY269.jpg&refer=http%3A%2F%2Fimg001.hc360.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636778684&t=9b60a64cd2f3ec0c2f1a523969dac81c'),
            data: [
              {
                value: voltage_2,
                itemStyle: {
                  color: '#ff0080'
                }
              },
              {
                value: current_2,
                itemStyle: {
                  color: '#5470C6'
                }
              },
              {
                value: power_2,
                itemStyle: {
                  color: '#91CC75'
                }
              },
              {
                value: speed_2,
                itemStyle: {
                  color: '#EE6666'
                }
              },                                          
            ],
            boardAlarm: this.getColor(this.msg['故障报警2']),
            currentAlarm: this.getColor(this.msg['电流低报2'] || this.msg['电流高报2']),
          },
          {
            title:'设备3',
            imgSrc: this.getAvatarString('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg001.hc360.cn%2Fy5%2FM00%2F11%2FA0%2FwKhQUVXi9JGEGUeXAAAAAG_rpQY269.jpg&refer=http%3A%2F%2Fimg001.hc360.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636778684&t=9b60a64cd2f3ec0c2f1a523969dac81c'),
            data: [
              {
                value: voltage_3,
                itemStyle: {
                  color: '#ff0080'
                }
              },
              {
                value: current_3,
                itemStyle: {
                  color: '#5470C6'
                }
              },
              {
                value: power_3,
                itemStyle: {
                  color: '#91CC75'
                }
              },
              {
                value: speed_3,
                itemStyle: {
                  color: '#EE6666'
                }
              },                                          
            ],
            boardAlarm: this.getColor(this.msg['故障报警3']),
            currentAlarm: this.getColor(this.msg['电流低报3'] || this.msg['电流高报3']),
          },
        ]

        console.log('=====================')
        console.log(cards)

        return cards
      }

    },


  },

  methods: {
    getAvatarString (str) {
      const http = 'http'
      const HTTP = 'HTTP'
      const isIncludeHttp = str.search(http) !== -1 || str.search(HTTP) !== -1
      // console.log('======isIncludeHttp======')
      // console.log(isIncludeHttp)
      if (isIncludeHttp) {
        return str
      } else {
        return require('@/statics' + str)
      }
    },

    getColor (val) {
      if (val === true) {
        return 'red'
      } else {
        return 'green'
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

        if(topic == 'devices/202110100001'){
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
      // this.statusData.splice(0, this.statusData.length)
      // for (const msg_dict of msg){
      //   // 插入新数组
      //   this.statusData.push(msg_dict)
      // }
      // console.log(typeof(msg))
      // this.msg = msg
      
      const current_1 = msg['1#电流']
      const current_2 = msg['2#电流']
      const current_3 = msg['3#电流']
      const speed_1 = msg['转速1']
      const speed_2 = msg['转速2']
      const speed_3 = msg['转速3']
      const red = msg['红灯']
      const green = msg['绿灯']
      const yellow = msg['黄灯']

      console.log(current_1)
      console.log(current_2)
      console.log(current_3)
      console.log(speed_1)
      console.log(speed_2)
      console.log(speed_3)
      console.log(red)
      console.log(green)
      console.log(yellow)

      // this.$set(this.msg, msg);

      // $.each(msg, function (k, v) {
      //   Vue.set(this.msg, k, Object.assign({}, v));
      // });

      this.msg = Object.assign({}, this.msg, msg)
    },  

    // updatePLC: function(msg) {
    //   // 清空原数组
    //   this.plcData.splice(0, this.plcData.length)
    //   for (const msg_dict of msg){
    //     // 插入新数组
    //     this.plcData.push(msg_dict)
    //   }
    // }  

  },

  destroyed () {
      // 销毁监听
    // clearInterval(this.timer)
    this.destroyConnection()      
  },

}
</script>


<style lang="scss">
// <style lang="less">
#cards {
  display: flex;
  justify-content: space-between;
  height: 65%;

  .card-item {
    background-color: rgba(6, 30, 93, 0.5);
    border-top: 2px solid rgba(1, 153, 209, .5);
    width: 19%;
    display: flex;
    flex-direction: column;
  }

  .card-header {
    display: flex;
    height: 15%;
    align-items: center;
    justify-content: space-between;

    .card-header-left {
      font-size: 18px;
      font-weight: bold;
      padding-left: 20px;
    }

    .card-header-right {
      padding-right: 20px;
      font-size: 40px;
      color: #03d3ec;
    }
  }

  .ring-charts {
    height: 35%;
  }

  .card-footer {
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .card-footer-item {
    padding: 5px 10px 0px 10px;
    box-sizing: border-box;
    width: 40%;
    background-color: rgba(6, 30, 93, 0.7);
    border-radius: 3px;

    .footer-title {
      font-size: 15px;
      margin-bottom: 5px;
      justify-content: center;
    }

    .footer-detail {
      font-size: 20px;
      color: #1294fb;
      display: flex;
      font-size: 18px;
      align-items: center;
      justify-content: center;

      .dv-digital-flop {
        margin-right: 5px;
      }
    }
  }
}
</style>

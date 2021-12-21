
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
        <div class="q-pa-md" style="max-width: 600px">
          <q-input
            v-model="text"
            filled
            type="textarea"
            autogrow
          />
        </div>
      </q-card-section>

      <q-separator />  

      <q-card-section>
        <div class="text-h6 text-indigo-8">
          工控机通信测试
        </div>
        <div class="text-subtitle2">
          读写数据库
        </div>
      </q-card-section>

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


export default {
  name: 'Status',
  data () {
    return {
      path: 'ws://127.0.0.1:8010/ws/device',
      text: "Mon, 2021-07-12 13:35:22 meritorTcpServer.py[line:344] WARNING =====ATLAS====== \n Mon, 2021-07-12 13:35:22  192.168.92.37\nMon, 2021-07-12 13:35:22  b'\x0200209999            \x00\x03'\n Mon, 2021-07-12 13:35:25 ======NEW DATA======== "
    }
  },
  mounted() {
  //  this.init()
  },

  methods: {
      init: function () {
          if(typeof(WebSocket) === "undefined"){
              alert("您的浏览器不支持socket")
          }else{
              // 实例化socket
              this.socket = new WebSocket(this.path)
              // 监听socket连接
              this.socket.onopen = this.open
              // 监听socket错误信息
              this.socket.onerror = this.error
              // 监听socket消息
              this.socket.onmessage = this.getMessage
          }
      },
      open: function () {
          console.log("socket连接成功")
      },
      error: function () {
          console.log("连接错误")
      },
      getMessage: function (msg) {
          console.log(msg.data)
          this.text = this.text + '\n'+ msg.data
      },
      send: function () {
          this.socket.send(params)
      },
      close: function () {
          console.log("socket已经关闭")
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
  computed: {
    // 计算属性的 getter

  },

  destroyed () {
      // 销毁监听
  },
}
</script>

<style lang="sass" scoped>

</style>
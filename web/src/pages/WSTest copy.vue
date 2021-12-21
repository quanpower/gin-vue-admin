<template>  
  <div>  

    <div v-for="item in log_list"  v-bind:key="item">  
        {{item}}  
    </div>  

    <input v-model="msg" />  

    <button @click="send">发送消息</button>  

</div>  

</template>  



<script>  

export default {  
  data () {  
    return {  
      msg: "",  
      log_list:[]  
    }  
  },  
  //注册组件标签  
  components:{  


  },  
  sockets:{  
    connect: function(){  
      console.log('socket 连接成功')  
    },  
    message: function(val){  
      console.log('返回:'+val);  
    this.log_list.push(val);  
    }  
},  
  mounted:function(){  




},  
  methods:{  

    send(){  
      this.$socket.emit('message',encodeURI("用户:"+this.msg));  
    },  



  }  
}  


</script>  


<style>  

</style>